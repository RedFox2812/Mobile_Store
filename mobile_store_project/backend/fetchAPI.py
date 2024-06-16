import json
from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from bson import ObjectId
from pymongo.server_api import ServerApi
from flask_cors import CORS

uri = "mongodb+srv://lehaiduong:Duong12345@atlascluster.wuubbjn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
# thư viện hổ trợ chatbot
from collections import defaultdict, Counter
from model_trainning import tf, tf_idf, preprocess
from model_trainning import model
import pickle
import numpy as np
import math
import random

training_data_path = "training_data"
datatrain = pickle.load(open(training_data_path, "r+b"))
words = datatrain["words"]
idf_arr = datatrain["idf_arr"]
client = MongoClient(uri, server_api=ServerApi("1"))
database = client["mobile_store_train"]
data = database["trains"]


app = Flask(__name__)
CORS(
    app,
    resources={r"/execute_python_function/*": {"origins": "http://localhost:5173"}},
    methods=["GET", "POST"],
)

training_data_path = "training_data"
datatrain = pickle.load(open(training_data_path, "r+b"))
words = datatrain["words"]
classes = datatrain["classes"]
idf_arr = datatrain["idf_arr"]
model_path = "mobile_store_project//backend//model.tflearn"
model.load(model_path)


def loc_tu_trung_nhau(sent):
    # Tách câu thành các từ dựa trên khoảng trắng
    words = sent.split()
    # Sử dụng bộ (set) để loại bỏ các từ trùng lặp và giữ thứ tự ban đầu
    seen = set()
    result = []
    for word in words:
        if word not in seen:
            seen.add(word)
            result.append(word)
    # Ghép các từ lại thành một chuỗi
    return " ".join(result)


def tf_idf_new(sent, words):
    tf_new = tf(sent, words)
    matrix = []
    for i in range(len(tf_new)):
        matrix.append(round(tf_new[i] * idf_arr[i], 4))
    tf_idf_matrix = matrix
    return tf_idf_matrix


ERROR_THRESHOLD = 0.25


# hàm dự đoán label
def classify(sentence):
    print(sentence)
    results = model.predict([tf_idf_new(sentence, words)])[0]
    results = [[i, r] for i, r in enumerate(results) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append((classes[r[0]], r[1]))
    print(sentence)
    if return_list:
        return return_list[0][0]


# hàm tìm key word
def get_key_word(sentence):
    sentence = preprocess(sentence)
    tfidf_sentence = tf_idf_new(sentence, words)
    index_key = np.argmax(tfidf_sentence)
    print(index_key)
    key_token = words[index_key]
    index_key = sentence.split().index(key_token)
    key_word = sentence.split()[index_key]
    return key_word


# hàm tạo câu
def generate_sentence(bigram_probabilities, start_word, max_lenght=100):
    current_word = start_word
    sentence = [current_word]
    for _ in range(max_lenght - 1):
        if current_word in bigram_probabilities:
            if current_word == "</s>":
                break
            bigram_values = list(bigram_probabilities[current_word].values())
            if bigram_values != []:
                max_value = max(bigram_values)
                index = bigram_values.index(max_value)
                key_values = list(bigram_probabilities[current_word].keys())
                next_word = key_values[index]
                if next_word == "</s>":
                    break
                if next_word == "<s>":
                    break
                sentence.append(next_word)
                current_word = next_word
        else:
            break

    return " ".join(sentence)


# hàm tính độ tương đồng cosine
def cosine(tfidf_1, tfidf_2):
    tu_so = 0
    for i in range(len(tfidf_1)):
        tu_so = tu_so + (float(tfidf_1[i]) * float(tfidf_2[i]))
    vecto_A = 0
    vecto_B = 0
    for i in range(len(tfidf_1)):
        vecto_A = vecto_A + (tfidf_1[i] * tfidf_1[i])
        vecto_B = vecto_B + (tfidf_2[i] * tfidf_2[i])
    vecto_A = math.sqrt(vecto_A)
    vecto_B = math.sqrt(vecto_B)
    mau_so = vecto_A * vecto_B
    consine_value = 1 - (tu_so / mau_so)
    return consine_value


# hàm lấy top
def toprank(sents, consine_arr, num=3):
    top = []
    for i in range(num - 1):
        index = consine_arr[i][1]
        top.append(sents[index])
    return top


# hàm tạo câu mới
def response(sentence):
    label = classify(sentence)
    print(label)
    key_word = get_key_word(sentence)
    # lọc và tinh tf_idf cho dữ liệu answer có tag = label và key_word
    docs = data.find({"tag": label})
    docs_key_word = []
    tf_idf_arr = []
    for doc in docs:
        w = []
        doc = preprocess(doc["answer"])
        for word in doc.split():
            if key_word == word:
                docs_key_word.append(doc)
                tf_idf_matrix = tf_idf(doc, words, idf_arr)
                tf_idf_arr.append(tf_idf_matrix)
    print(key_word)
    # lấy keyword trong câu
    words_key = []
    for doc in docs_key_word:
        w = []
        doc = doc.lower()
        w.append("<s>")
        for token in doc.split():
            w.append(token)
        w.append("</s>")
        for token in w:
            words_key.append(token)

    # B1 đếm số lần xuất hiện của các cặp từ
    bigram_counts = defaultdict(Counter)
    for i in range(len(words_key) - 1):
        bigram_counts[words_key[i]][words_key[i + 1]] = (
            bigram_counts[words_key[i]][words_key[i + 1]] + 1
        )

    # B2 Tính xác suất Bigram
    bigram_probabilities = defaultdict(dict)
    for word in bigram_counts:
        tong_cac_tu_dung_ke_word = float(sum(bigram_counts[word].values()))
        for next_word in bigram_counts[word]:
            so_lan_xuat_hien_cua_tu_ke_word = bigram_counts[word][next_word]
            bigram_probabilities[word][next_word] = (
                so_lan_xuat_hien_cua_tu_ke_word / tong_cac_tu_dung_ke_word
            )

    # tạo list chứa các câu mới
    sents = []
    for word in words_key:
        new_sentence = generate_sentence(bigram_probabilities, word)
        if len(new_sentence.split()) > 2:
            new_sentence = loc_tu_trung_nhau(new_sentence)
            sents.append(new_sentence)

    # B3 tính tf-idf của các câu mới
    tfidf_output = []
    for sent in sents:
        tfidf_sent = tf_idf_new(sent, words)
        tfidf_output.append([sent, tfidf_sent])

    # B4 tính độ tương đồng và đưa ra top rank
    consine_arr = []
    for tfidf_1 in tf_idf_arr:
        num = 0
        for i in range(len(tfidf_output)):
            num = num + 1
            distance_matrix = cosine(tfidf_1, tfidf_output[i][1])

            consine_arr.append([distance_matrix, num])

    consine_arr.sort()
    print(consine_arr)
    top_sent = toprank(sents, consine_arr, num=len(docs_key_word))

    # B5 trả về kết quả
    print(top_sent)
    if len(top_sent) > 1:
        output = random.choice(top_sent)
    else:
        output = top_sent

    return output


# Create a new client and connect to the server
def convert_to_json_serializable(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {k: convert_to_json_serializable(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_to_json_serializable(item) for item in obj]
    else:
        return obj


def functionPython(input_text, data):
    if input_text == "login":
        result = "false"
        client = MongoClient(uri, server_api=ServerApi("1"))
        database = client["mobile_store"]
        col_user = database["users"]
        data = json.loads(data)
        # result = "false"
        print(data["email"])
        print(type(data))
        user_check = col_user.find({"email": data["email"]})
        user = []
        for doc in user_check:
            print(doc)
            user.append(doc)
        if user == []:
            result = "email_false"
            return result
        else:
            user = user[0]
            if user["pass"] == data["password"]:
                result = convert_to_json_serializable(user["_id"])
                return result
            else:
                result = "pass_false"
                return result

    if input_text == "addUser":
        client = MongoClient(uri, server_api=ServerApi("1"))
        mydb = client["User"]
        mycol = mydb["users"]
        newUser = {
            "name": "le hai duong 1213",
            "phone": "0913824323",
            "address": "Can tho 1231",
            "email": "phamthanhduy.281203@gmail.com",
        }
        mycol.insert_one(newUser)
        return "add susscessfull"

    if input_text == "getProductList":
        client = MongoClient(uri, server_api=ServerApi("1"))
        database = client["mobile_store"]
        result = []
        dataProducts = database["products"].find()
        arr = []
        for product in dataProducts:
            product = convert_to_json_serializable(product)
            arr.append(product)
        dataProducts = arr
        result = dataProducts
        return result
    if input_text == "filter":
        client = MongoClient(uri, server_api=ServerApi("1"))
        database = client["mobile_store"]
        dataProducts = database["products"]
        result = []
        valueFilter = json.loads(data)
        print(valueFilter)
        dataFilter = []
        newDataFilter = []
        datanew = []

        def addData(data):
            for doc in data:
                dataFilter.append(
                    {
                        "_id": convert_to_json_serializable(doc["_id"]),
                        "id": doc["id"],
                        "records": doc["records"],
                    }
                )

        # Brand
        if newDataFilter == []:
            datanew = dataProducts.find()
            addData(datanew)
            newDataFilter = dataFilter
        if valueFilter["brands"] != []:
            for brand in valueFilter["brands"]:
                datanew = dataProducts.find({"records.brand.name": brand})
                addData(datanew)
            newDataFilter = dataFilter
        # Extra
        if valueFilter["extra"] != []:
            for extraf in valueFilter["extra"]:
                if extraf == "Chơi game/ cấu hình cao":
                    value = "chơi game"
                if extraf == "Pin khủng":
                    value = "pin khủng"
                if extraf == "Camera chất lượng":
                    value = "camera"
                if extraf == "Mỏng nhẹ":
                    value = "mỏng nhẹ"
                for doc in newDataFilter:
                    extras = []
                    for extra in doc["records"]["extra"]:
                        extras.append(extra["name"])
                    if value not in extras:
                        print(doc["records"]["name"], extras)
                        newDataFilter.remove(doc)
        # Ram
        if valueFilter["ram"] != "":
            dataFilter = newDataFilter
            for doc in dataFilter:
                if int(doc["records"]["additionalProperty"][3]["value"][0]) == int(
                    valueFilter["ram"]
                ):
                    print(
                        doc["records"]["name"],
                        doc["records"]["additionalProperty"][3]["value"],
                    )
                else:
                    dataFilter.remove(doc)
                print(doc["records"]["additionalProperty"][3]["value"])
            newDataFilter = dataFilter
        return newDataFilter
    if input_text == "getuserdata":
        userid = data
        userid = userid.strip().strip('"')
        objid = ObjectId(userid)
        client = MongoClient(uri, server_api=ServerApi("1"))
        mydb = client["mobile_store"]
        mycol = mydb["users"]
        doc = mycol.find_one({"_id": objid})

        data = {
            "_id": convert_to_json_serializable(doc["_id"]),
            "id": doc["id"],
            "name": doc["name"],
            "phone": doc["phone"],
            "email": doc["email"],
            "avata": doc["avata"],
        }

        result = json.dumps(data)
        return result
    if input_text == "getUserList":
        client = MongoClient(uri, server_api=ServerApi("1"))
        mydb = client["User"]
        mycol = mydb["users"]
        docs = mycol.find()
        dataUser = []
        for doc in docs:
            doc["_id"] = str(doc["_id"])
            dataUser.append(doc)
        json_data = json.dumps(dataUser)
        return json_data
    if input_text == "chatbot":
        sent = data
        print(sent)
        result = "false"
        result = response(preprocess(sent))
        result = result.replace("_", " ")
        result = result.replace("<s>", "")
        return result


@app.route("/execute_python_function", methods=["GET"])
def execute_python_function():
    input_data = request.args.get("data")
    input_text = request.args.get("input")
    result = functionPython(input_text.strip(), input_data.strip())
    return jsonify(result=result)


if __name__ == "__main__":
    app.run(debug=True)

from collections import defaultdict, Counter
from model_training import tf, tf_idf, preprocess, model
import pickle
import numpy as np
import math
import random
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://lehaiduong:Duong12345@atlascluster.wuubbjn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
# thư viện hổ trợ chatbot


client = MongoClient(uri, server_api=ServerApi("1"))
database = client["mobile_store_train"]
data = database["trains"]

training_data_path = "training_data"
datatrain = pickle.load(open(training_data_path, "r+b"))
words = datatrain["words"]
classes = datatrain["classes"]
idf_arr = datatrain["idf_arr"]
model_path = "D:/study/DOAN_OLD/Mobile_Store/mobile_store_project/backend/model.tflearn"
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
        else:
            if sent.count(word) < 3:
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
        top.append(sents[index-1])
    return top


# # hàm tạo câu mới
def response(sentence):
    label = classify(sentence)
    print(label)
    key_word = get_key_word(sentence)
    # lọc và tinh tf_idf cho dữ liệu answer có tag = label và key_word
    docs = data.find({"tag": label})
    print(docs)
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
    print(docs_key_word)
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
        output = "xin lỗi tôi là máy nên chưa nhận thức được câu hỏi vui lòng cung cấp câu hỏi chi tiết hơn "

    return output


def convert_to_json_serializable(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {k: convert_to_json_serializable(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_to_json_serializable(item) for item in obj]
    else:
        return obj

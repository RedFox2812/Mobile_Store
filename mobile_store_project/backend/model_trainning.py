import nltk
from nltk.stem.lancaster import LancasterStemmer
from pyvi import ViTokenizer, ViPosTagger
import regex

stemmer = LancasterStemmer()
import math
import numpy as np
import tflearn
import tensorflow as tf
import random
import pickle
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Loading data training
import json

uri = "mongodb+srv://lehaiduong:Duong12345@atlascluster.wuubbjn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
client = MongoClient(uri, server_api=ServerApi("1"))
database = client["mobile_store_train"]
intents = database["trains"]

stopword = set()
with open(
    "mobile_store_project/backend/chatbot/data/stopwords.txt", "r", encoding="utf-8"
) as _fp:
    stopwords = _fp.readlines()
    for i in range(len(stopwords)):
        stopwords[i] = stopwords[i].replace("\n", "")
    # print(stopwords)


def remove_stopwords(line):
    words = []
    for word in line.split():
        if word not in stopwords:
            words.append(word)
    return " ".join(words)


def preprocess(sent):
    # chuẩn hóa unicode
    sent = sent.encode("utf-8")
    # tách từ
    sent = ViTokenizer.tokenize(sent.decode("utf-8"))
    # loại stopwords
    sent = remove_stopwords(sent)
    # xóa các ký tự không cần thiết
    sent = regex.sub(
        r"[^\s\wáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịúùủũụưứừửữựýỳỷỹỵđ_]",
        "",
        sent,
    )
    # xóa khoảng trắng thừa
    sent = regex.sub(r"\s+", " ", sent).strip()
    #  remove các kí tự kéo dài
    # sent = regex.sub(
    #     r"([A-Z])\1+", lambda m: m.group(1).upper(), sent, flags=regex.IGNORECASE
    # )
    # # remove nốt những kí tự thừa thãi
    # print(sent)

    return sent


def canbachai(f):
    double = 0
    for num in f:
        double = double + num * num
    canbac = math.sqrt(double)
    return canbac


# ------------------------------------------------------------------------------------------
# Xay dung ham tinh tf-idf
def canbachai(f):
    double = 0
    for num in f:
        double = double + num * num
    canbac = math.sqrt(double)
    return canbac


def tf(doc, words):
    count_token = []
    for token in words:
        if token not in doc:
            num = 0
        else:
            num = doc.count(token)
        count_token.append(num)
    f = count_token
    # print("f = {}".format(f))
    canbac = canbachai(f)
    # print("canbac = {}".format(canbac))
    if canbac == 0.0:
        canbac = 1
    value = []
    for num in f:
        value.append(round((num + 1 / canbac), 4))
    tf = value
    return tf


# ham tính idf
def idf(docs, words):
    idf_arr = []
    for token in words:
        D = 0
        for doc in docs:
            if token in doc.split():
                D = D + 1
        if D == 0:
            idf_value = math.log(2)
        else:
            idf_value = math.log((1 + len(doc) / 1 + D) + 1)
        idf_arr.append(round(idf_value, 4))
    return idf_arr


def tf_idf(doc, words, idf):
    # count so lan xuất hiện của từ
    tf_idf_matrix = []
    tf_matrix = tf(doc.split(), words)
    for i in range(len(tf_matrix)):
        tf_idf_value = tf_matrix[i] * idf[i]
        tf_idf_matrix.append(tf_idf_value)
    return tf_idf_matrix


# ---------------------------------------------------------------------------------------------------------
# trích xuất bộ từ vựng dùng phân loại

words = []
classes = []
documents = []
documents_idf = []
# data = []
for item in intents.find():
    # thêm code tiền xử lý
    question = preprocess(item["question"])
    answer = preprocess(item["answer"])
    w = nltk.word_tokenize(question)
    words.extend(w)
    documents.append((question, item["tag"]))
    documents_idf.append(question)
    if item["tag"] not in classes:
        classes.append(item["tag"])
words = sorted(list(set(words)))
classes = sorted(list(set(classes)))
# print(words)
#  tạo dữ liệu tranning
output = []
output_empty = [0] * len(classes)
training = []
idf_arr = idf(documents_idf, words)
# # # tập huấn luyện, bag_of_word cho mỗi câu
for doc in documents:
    # print(documents.index(doc), doc[0])
    tf_idf_matrix = tf_idf(doc[0], words, idf_arr)
    # đầu ra là '0' cho mỗi thẻ và '1' cho thẻ hiện tại
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    training.append([tf_idf_matrix, output_row])
# print(training[0])
random.shuffle(training)
training = np.array(training, dtype=object)

# tạo list train và test
train_x = list(training[:, 0])
train_y = list(training[:, 1])
# print(train_x)
# print(train_y)
# Build neural network
net = tflearn.input_data(shape=[None, len(train_x[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(train_y[0]), activation="softmax")
net = tflearn.regression(net, optimizer="adam", loss="categorical_crossentropy")
# định nghĩa model và setup tensorboard

model = tflearn.DNN(net, tensorboard_dir="tflearn_logs")

# Start training

model.fit(train_x, train_y, n_epoch=500, batch_size=3, show_metric=True)
model.save("mobile_store_project/backend//model.tflearn")
pickle.dump(
    {
        "words": words,
        "classes": classes,
        "idf_arr": idf_arr,
        "train_x": train_x,
        "train_y": train_y,
    },
    open("training_data", "wb"),
)
# =============><================

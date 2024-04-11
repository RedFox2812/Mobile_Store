import json
from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
uri = "mongodb+srv://lehaiduong:Duong12345@atlascluster.wuubbjn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
app = Flask(__name__)
CORS(app, resources={r"/execute_python_function/*": {"origins": "http://localhost:5173"}})
CORS(app)
# Create a new client and connect to the server
with open("D:/git clone/doan2/Mobile_Store/mobile_store_project/backend/newDevices.json") as file:
    data = json.load(file)
def functionPython(input_text):
    if input_text=="addUser":
        client = MongoClient(uri, server_api=ServerApi('1'))
        mydb = client["User"]
        mycol= mydb["users"]
        newUser = {
                "name" : "le hai duong 1213",
                "phone": "0913824323",
                "address": "Can tho 1231",
                "email":"phamthanhduy.281203@gmail.com",
                }
        mycol.insert_one(newUser)
        return "add susscessfull"
        
    if input_text=="getProductList":
        json_data = data
        return json_data
    if input_text=="getUserList":
        client = MongoClient(uri, server_api=ServerApi('1'))
        mydb = client["User"]
        mycol= mydb["users"]
        docs = mycol.find()
        dataUser = []
        for doc in docs:
            doc['_id'] = str(doc['_id'])
            dataUser.append(doc)
        json_data = json.dumps(dataUser)
        return json_data
@app.route('/execute_python_function', methods=['GET'])
def execute_python_function():
    input_text = request.args.get('input')
    result = functionPython(input_text)
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
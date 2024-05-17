import json
from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from bson import ObjectId
from pymongo.server_api import ServerApi
from flask_cors import CORS
uri = "mongodb+srv://lehaiduong:Duong12345@atlascluster.wuubbjn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
app = Flask(__name__)
CORS(app, resources={r"/execute_python_function/*": {"origins": "http://localhost:5173"}},methods=['GET', 'POST'])

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
def functionPython(input_text,data):
    if input_text == "login":
        result = "false"
        client = MongoClient(uri, server_api=ServerApi('1'))
        database = client["mobile_store"]
        col_user = database["users"]
        # email,password = data.split(",")
        data = json.loads(data) 
        # result = "false"    
        col_cart = database["carts"]
        col_order = database["orders"]
        user_check= col_user.find({"email":data["email"]})
        user = []
        for doc in user_check:
            user.append(doc)
        if user == []:
            result = "false"
        else:
            user = user[0]
            if user["pass"] == data["password"]:
                print(user["_id"])
                cursor_cart = database["carts"].find({"id": str(user["_id"])})
                cart = cursor_cart[0]
                print(cart)
                dataUser = {
                    "user":{
                            "id_nd":convert_to_json_serializable(user["_id"]),
                            "name":user["name"],
                            "email":user["email"],
                            "pass":user["pass"]
                    },
                    "cart":{
                        "id": cart["id"],
                        "masp":cart["masp"],
                        "soluong":cart["soluong"]
                    }
                }
                result = dataUser
                return result 
            return result
        return result
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
        client = MongoClient(uri, server_api=ServerApi('1'))
        database = client["Products"]
        result="false"
        dataProducts = database["product"].find()
        print(dataProducts)
        arr = []
        for product in dataProducts:
            product =  convert_to_json_serializable(product)
            arr.append(json.dumps(product))
        dataProducts = arr
        result = dataProducts
        json_data = result
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
    input_data = request.args.get('data')
    input_text = request.args.get('input')
    result = functionPython(input_text.strip(),input_data.strip()) 
    return jsonify(result=result)
if __name__ == '__main__':
    app.run(debug=True)
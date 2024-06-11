import json
from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from bson import ObjectId
from pymongo.server_api import ServerApi
from flask_cors import CORS

uri = "mongodb+srv://lehaiduong:Duong12345@atlascluster.wuubbjn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
app = Flask(__name__)
CORS(
    app,
    resources={r"/execute_python_function/*": {"origins": "http://localhost:5173"}},
    methods=["GET", "POST"],
)


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


@app.route("/execute_python_function", methods=["GET"])
def execute_python_function():
    input_data = request.args.get("data")
    input_text = request.args.get("input")
    result = functionPython(input_text.strip(), input_data.strip())
    return jsonify(result=result)


if __name__ == "__main__":
    app.run(debug=True)

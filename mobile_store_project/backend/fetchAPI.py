import json
import os
from functools import wraps
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from model_training import preprocess
from pymongo.mongo_client import MongoClient
from bson import ObjectId
from pymongo.server_api import ServerApi
from flask_cors import CORS
from get_model import response
import jwt
import bcrypt
import datetime



app = Flask(__name__)

load_dotenv()

uri = os.getenv("MONGO_URI")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
client = MongoClient(uri, server_api=ServerApi("1"))
databaseTrain = client["mobile_store_train"]
database = client["mobile_store"]
col_products = database["products"]
col_users = database["users"]
col_carts = database["carts"]
col_orders = database["orders"]
CORS(
    app,
    resources={r"/execute_python_function/*": {"origins": ["http://localhost:5174", "http://localhost:5173"]}},
    methods=["GET", "POST"],
)



def convert_to_json_serializable(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {k: convert_to_json_serializable(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_to_json_serializable(item) for item in obj]
    else:
        return obj


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]
        if not token:
            return jsonify({
                "success": False,
                "message": "Token không tồn tại"
            }), 401
        try: 
            data = jwt.decode(
                token, app.config["SECRET_KEY"],algorithms="HS512"
            )
            request.user_id = data["user_id"]
        except jwt.ExpiredSignatureError:
            return jsonify({
                "success" : False,
                "message": "Token hết hạn" 
            }) , 401
        except jwt.InvalidKeyError:
            return jsonify({
                "success": False,
                "message": "Token không hợp lệ"
            }), 401
        return f(*args, **kwargs)
    return decorated        


@app.route("/execute_python_function/profile", methods=["GET"])
@token_required
def execute_profile():
    try:
        user = col_users.find_one({"_id": ObjectId(request.user_id)})

        if not user:
            return jsonify({
                "success": False,
                "message": "Không tìm thấy user"
            }), 404

        return jsonify({
            "success": True,
            "data": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "phone": user["phone"],
                "address": user["address"],
                "avata": user["avata"]
            }
        }), 200
    except ValueError:
        jsonify({
            "success":False,
            "message":"page hoặc limit không hợp lệ"
        }),400
    except Exception as e:
        return  jsonify({
            "success":False,
            "message":"Lỗi server",
            "error":str(e)
        }),500

@app.route("/execute_python_function/getProductList", methods=["GET"])
def execute_productList():
    try: 
        search= request.args.get("search")
        page = int(request.args.get("page",1))
        limit = int(request.args.get("limit",10))
        if page < 1 or limit < 1:
            return jsonify({
                "success": False,
                "message": "page và limit phải lớn hơn 0"
            }), 400 
        
        romFilter = request.args.get("rom")
        ramFilter= request.args.get("ram")
            
        typeFilter= request.args.get("type")
        chargeFilter= request.args.get("charge")
        brandsFilter = [b for b in request.args.getlist("brand") if b]
        extrasFilter = [e for e in request.args.getlist("extra") if e]
        
        skip = (page-1)*limit 
        query = {}
        conditions = []
        if brandsFilter:
            query["records.brand.name"] = {"$in": brandsFilter}

        if ramFilter:
            conditions.append({
                "records.additionalProperty" : {
                    "$elemMatch": {
                        "name": "RAM",
                        "value": f"{ramFilter}"
                    }
                }
            })
        if romFilter:
            conditions.append({
                "records.additionalProperty":{
                    "$elemMatch":{
                        "name": "Bộ nhớ trong",
                        "value":f"{romFilter}"
                    }
                }
            })
        
        if conditions:
            query["$and"] = conditions
            
        if search and search != "none":
            query["records.name"] = {"$regex": search, "$options": "i"}
        
        products_cursor = col_products.find(query).skip(skip).limit(limit)
        arr = []
        for product in products_cursor:
            product["_id"] = str(product["_id"])   # chỉ convert ObjectId
            arr.append(product)
            
        return jsonify({
            "success": True,
            "page": page,
            "limit": limit,
            "count": len(arr),
            "data": arr,
            "message":"lấy danh sách sản phẩm thành công"
        }), 200
    except ValueError:
        jsonify({
            "success":False,
            "message":"page hoặc limit không hợp lệ"
        }),400
    except Exception as e:
        return  jsonify({
            "success":False,
            "message":"Lỗi server",
            "error":str(e)
        }),500
        
@app.route("/execute_python_function/login", methods=["POST"])
def execute_login():
    try:
        data = request.get_json()
        print(data)
        if not data or "email" not in data or "password" not in data:
            return jsonify({"message": "Thiếu dữ liệu"}), 400
        print("check đủ dữ liệu")
        col_users.create_index("email", unique = True)
        user = col_users.find_one({"email": data["email"]})
        print(user)
        if not user:
            return jsonify({"success": False,"message": "Email không tồn tại"}), 404
        print("check email")
        if not bcrypt.checkpw(
          data["password"].encode("utf-8")  , user["pass"].encode("utf-8")
        ): 
            return jsonify({"success":False, "message":"Mật không đúng vui lòng kiểm tra lại"}), 401
        print("check mật khẩu")
        token = jwt.encode(
            {
                "user_id": str(user["_id"]),
                "email": user["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
            }, app.config["SECRET_KEY"], algorithm="HS512"
        )
        print(token)
        
        return jsonify({
            "success":True,
            "message": "Đăng nhập thành công",
            "user_id": str(user["_id"]),
            "token": token 
        }), 200
        
    except ValueError:
        return jsonify({
            "success": False,
            "message": "Dữ liệu không hợp lệ", 
        }),400
    except Exception as e:
        return jsonify({
            "success":False,
            "message":"Lỗi server",
            "error": str(e)
        }), 500
        

        
@app.route("/execute_python_function/register", methods=["POST"])
# {username: 'ptd', phonenumber: '05154', email: 'hanhtrinhit.281203@gmail.com', password: 'Duy12345!', address: 'Hồ Chí Minh city'}    
def execute_register():
    try:
        data = request.get_json()
        print(data)
        if not data or "username" not in data or "phonenumber" not in data or "email" not in data or "password" not in data or "address" not in data:
            return jsonify({"success": False,"message": "Thiếu dữ liệu"}), 400


        col_users.create_index("email", unique = True)
        
        # check email 
        user_find_email = col_users.find_one({"email": data["email"]})
        if user_find_email:
            return jsonify({
                "success" : False,
                "message":"Email này đã tồn tại"
            }) , 409    
        print("check mail success")    
        # check phone
        user_find_phone = col_users.find_one({"phone": data["phonenumber"]})
        if user_find_phone:
            return jsonify({
                "success" : False,
                "message":"Số điện thoại này đã tồn tại"
            }) , 409    
        print("check phone success")
        
        hashed_password = bcrypt.hashpw(
            data["password"].encode("utf-8"),
            bcrypt.gensalt()
        )
        print(hashed_password)
        new_user = {
            "name": data["username"],
            "phone": data["phonenumber"],
            "email": data["email"],
            "pass": hashed_password.decode("utf-8"),
            "address": data["address"],
            "avata":"avata",
            "createdAt": datetime.datetime.utcnow()
        }
        
        result = col_users.insert_one(new_user)
        token = jwt.encode({
            "user_id":str(result.inserted_id),
            "email": data["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, app.config["SECRET_KEY"], algorithm="HS512")

        return jsonify({
            "success": True,
            "message": "Đăng ký thành công",
            "token": token,
            "user_id": str(result.inserted_id)
        }), 201
    
    except Exception as e:
        return jsonify({
            "success":False,
            "message":"Lỗi Server",
            "error": str(e)
        }) ,500
    

@app.route("/execute_python_function/cart", methods=["GET"])
@token_required
def execute_cart(): 
    return jsonify({
        "success": True,
        "message": "Lấy thông tin giỏ hàng thành công"
    })
    

if __name__ == "__main__":
    app.run(debug=True)

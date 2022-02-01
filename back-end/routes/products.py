from flask import jsonify
from flask_restful import Resource, Api, request, reqparse, abort
from flask_cors import cross_origin
import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv
load_dotenv()

PATH = os.getenv('SERVICE_ACCOUNT_JSON_PATH')
cred = credentials.Certificate(PATH)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
db = firestore.client()


class products(Resource):
    @cross_origin()
    def post(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_PRODUCTS_TABLE_NAME')
            collection = db.collection(DB_NAME)

            product_data_parse = reqparse.RequestParser()

            product_data_parse.add_argument(
                "prodName", required=True, type=str)
            product_data_parse.add_argument(
                "prodQuantity", required=True, type=int)
            product_data_parse.add_argument("prodPrice", required=True, type=int)
            product_data_parse.add_argument("prodMRP", required=True, type=int)
            product_data_parse.add_argument("custId", required=True, type=str)

            args = product_data_parse.parse_args()

            prodName = args["prodName"]
            prodQuantity = args["prodQuantity"]
            prodPrice = args["prodPrice"]
            prodMRP = args["prodMRP"]
            custId = args["custId"]

            data = {'prodName': prodName, 'prodQuantity': prodQuantity, 'prodPrice': prodPrice, 'prodMRP': prodMRP,
                    'custId': custId}
            
            collection.add(data)
            return jsonify({'message': 'Product Added', 'data': data})

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})

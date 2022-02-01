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


class shipping(Resource):
    @cross_origin()
    def get(self):
        try:
            CUSTOMER = os.getenv('FIRESTORE_CUSTOMERS_TABLE_NAME')
            PRODUCTS = os.getenv('FIRESTORE_PRODUCTS_TABLE_NAME')
            collection1 = db.collection(CUSTOMER)
            docs1 = collection1.get()
            count = 0
            data = {}
            for doc1 in docs1:
                custData = doc1.to_dict()
                collection2 = db.collection(PRODUCTS)
                docs2 = collection2.get()
                purchaseOrder = {}
                purchaseCount = 0
                for doc2 in docs2:
                    prodData = doc2.to_dict()
                    if(prodData['custId'] == doc1.id):
                        purchaseOrder[purchaseCount] = {'prodName': prodData['prodName'], 'prodQuantity': prodData['prodQuantity'],
                                                        'prodMRP': prodData['prodMRP'], 'prodPrice': prodData['prodPrice'], 'prodId': doc2.id}
                        purchaseCount = purchaseCount + 1
                data[count] = {
                    'custId': doc1.id, 'custName': custData['custName'], 'purchaseOrder': purchaseOrder}
                count = count + 1
            return jsonify({'message': 'data sent', 'data': data})

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})

    @ cross_origin()
    def post(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_SHIPPING_TABLE_NAME')
            collection = db.collection(DB_NAME)

            shipping_data_parse = reqparse.RequestParser()

            shipping_data_parse.add_argument(
                "shipAddress", required=True, type=str)
            shipping_data_parse.add_argument(
                "shipCity", required=True, type=str)
            shipping_data_parse.add_argument(
                "shipPincode", required=True, type=int)
            shipping_data_parse.add_argument("prodId", required=True, type=str)
            shipping_data_parse.add_argument("custId", required=True, type=str)

            args = shipping_data_parse.parse_args()

            shipAddress = args["shipAddress"]
            shipCity = args["shipCity"]
            shipPincode = args["shipPincode"]
            prodId = args["prodId"]
            custId = args["custId"]

            data = {'shipAddress': shipAddress, 'shipCity': shipCity, 'shipPincode': shipPincode, 'prodId': prodId,
                    'custId': custId}
        
            collection.add(data)
            return jsonify({'message': 'Product Added', 'data': data})

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})

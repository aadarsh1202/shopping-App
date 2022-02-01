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


class customers_by_city(Resource):
    @cross_origin()
    def post(self):
        try:
            SHIPPING = os.getenv('FIRESTORE_SHIPPING_TABLE_NAME')
            CUSTOMER = os.getenv('FIRESTORE_CUSTOMERS_TABLE_NAME')

            user_data_parse = reqparse.RequestParser()

            user_data_parse.add_argument(
                "city", required=True, type=str)

            args = user_data_parse.parse_args()

            city = args["city"]
            collection1 = db.collection(SHIPPING)
            docs1 = collection1.get()
            count = 0
            data = {}
            for doc1 in docs1:
                shippingData = doc1.to_dict()
                if(city == shippingData['shipCity']):
                    collection2 = db.collection(CUSTOMER)
                    res = collection2.document(
                        shippingData['custId']).get()
                    customerData = res.to_dict()
                    data[count] = customerData
                    count = count + 1
            return jsonify({'message': 'data sent', 'data': data})

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})

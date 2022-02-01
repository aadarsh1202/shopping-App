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


class customers(Resource):
    @cross_origin()
    def get(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_CUSTOMERS_TABLE_NAME')
            collection = db.collection(DB_NAME)
            docs = collection.get()
            data = {}
            count = 0
            for doc in docs:
                custData = doc.to_dict()
                data[count] = {
                    'custName': custData['custName'], 'custId': doc.id}
                count = count + 1

            return jsonify({'message': 'data sent', 'data': data})

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})

    @ cross_origin()
    def post(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_CUSTOMERS_TABLE_NAME')
            collection = db.collection(DB_NAME)

            customer_data_parse = reqparse.RequestParser()

            customer_data_parse.add_argument(
                "custName", required=True, type=str)
            customer_data_parse.add_argument(
                "custEmailId", required=True, type=str)
            customer_data_parse.add_argument(
                "custMobileNo", required=True, type=int)
            customer_data_parse.add_argument("custCity", required=True, type=str)


            args = customer_data_parse.parse_args()

            custName = args["custName"]
            custEmailId = args["custEmailId"]
            custMobileNo = args["custMobileNo"]
            custCity = args["custCity"]

            result = {}

            data = {'custName': custName, 'custEmailId': custEmailId, 'custMobileNo': custMobileNo,
                    'custCity': custCity}
          
            collection.add(data)
            return jsonify({'message': 'Customer Added', 'data': data})

          

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})

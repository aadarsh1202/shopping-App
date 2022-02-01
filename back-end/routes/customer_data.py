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


class customer_data(Resource):
    @cross_origin()
    def get(self):
        try:
            SHIPPING = os.getenv('FIRESTORE_SHIPPING_TABLE_NAME')
            CUSTOMER = os.getenv('FIRESTORE_CUSTOMERS_TABLE_NAME')
            PRODUCTS = os.getenv('FIRESTORE_PRODUCTS_TABLE_NAME')

            collection1 = db.collection(CUSTOMER)
            docs1 = collection1.get()
            customerCount = 0
            customerDict = {}
            for doc1 in docs1:
                customerData = doc1.to_dict()
                collection2 = db.collection(PRODUCTS)
                docs2 = collection2.get()
                purchaseOrder = {}
                productDict = {}
                productCount = 0
                for doc2 in docs2:
                    productData = doc2.to_dict()
                    if(doc1.id == productData['custId']):
                        collection3 = db.collection(SHIPPING)
                        docs3 = collection3.get()
                        shippingDict = {}
                        for doc3 in docs3:
                            shippingData = doc3.to_dict()
                            if(doc2.id == shippingData['prodId']):
                                shippingDict = shippingData
                                shippingDict['message'] = 'data found'
                                shippingDict['shippingId'] = doc3.id
                                productDict = {'prodId': doc2.id, 'prodName': productData['prodName'],
                                               'prodQuantity': productData['prodQuantity'], 'prodPrice': productData['prodPrice'], 'prodMRP': productData['prodMRP'], 'shippingDetails': shippingDict}
                        if(len(productDict)==0):
                            shippingDict['message'] = 'data not found'
                            productDict = {'prodId': doc2.id, 'prodName': productData['prodName'],
                                               'prodQuantity': productData['prodQuantity'], 'prodPrice': productData['prodPrice'], 'prodMRP': productData['prodMRP'], 'shippingDetails': shippingDict}

                        purchaseOrder[productCount] = productDict
                        productCount = productCount + 1
                customerDict[customerCount] = {'custId': doc1.id, 'custName': customerData['custName'],
                                               'custCity': customerData['custCity'], 'custMobileNo': customerData['custMobileNo'],
                                               'custEmailId': customerData['custEmailId'], 'purchaseOrder': purchaseOrder}
                customerCount = customerCount + 1
            return jsonify({'message': 'data sent', 'data': customerDict})

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})

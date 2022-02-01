from flask import Flask
from flask_restful import Resource, Api, request
from flask_cors import CORS, cross_origin
from routes.customers import customers
from routes.products import products
from routes.shipping import shipping
from routes.customers_by_city import customers_by_city
from routes.customer_data import customer_data

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

api = Api(app)

api.add_resource(customers, '/customers')
api.add_resource(products, '/products')
api.add_resource(shipping, '/shipping')
api.add_resource(customers_by_city, '/customerByCity')
api.add_resource(customer_data, '/customerData')


if __name__ == '__main__':
    if(os.getenv("enviornment_production") == "True"):
        app.run(host='0.0.0.0', port=80)
    else:
        app.run(debug=True)

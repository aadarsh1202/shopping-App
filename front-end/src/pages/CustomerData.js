import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import TextField from "@mui/material/TextField";
import ProductsDetailsList from "./components/ProductsDetailsList";

const CustomerData = () => {
  const [customersData, setCustomersData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [productsData, setProductsData] = useState([]);



  const handleCustomerChange = (event) => {
    setCustomerName(event.target.value);
    Object.keys(customersData).map((customer) => {
      if (customersData[customer].custName === event.target.value) {
        setProductsData(customersData[customer].purchaseOrder)
      }
    });
  };
  async function fetchCustomersData() {
    axios
      .get("https://shopping-app22.herokuapp.com/customerData")
      .then((response) => {
        setCustomersData(response.data.data);
       })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchCustomersData();
  }, []);

  const renderProductsList = Object.keys(productsData).map((product) => {
    return (
      <>
        <ProductsDetailsList
          key={productsData[product].prodId}
          srno={parseInt(product) + 1}
          product={productsData[product]}
        />
      </>
    );
  });
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="container p-5 border">
          <h2>Customer Details</h2>
          <form className="mt-4">
            <div className="row">
              <div className="col-6 col-md-6 col-sm-12 mt-3">
                <TextField
                  id="outlined"
                  select
                  fullWidth
                  label="Customer Name"
                  value={customerName}
                  onChange={handleCustomerChange}
                  helperText="Select customer name"
                >
                  {Object.keys(customersData).map((customer) => (
                    <MenuItem
                      key={customersData[customer].custId}
                      value={customersData[customer].custName}
                    >
                      {customersData[customer].custName}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </form>
          <div className="table-responsive mt-5">
            <h2>Product Details</h2>
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Sr no.</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Shipping Details</th>
                </tr>
              </thead>
              <tbody>{renderProductsList}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerData;

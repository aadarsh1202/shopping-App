import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const ShippingDetailsForm = () => {
  const [shipAddress, setShipAddress] = useState("");
  const [shipCity, setShipCity] = useState('');
  const [shipPincode, setShipPincode] = useState(0);
  const [customersData, setCustomersData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleShipAddressChange = (event) => {
    setShipAddress(event.target.value);
  };
  const handleShipCityChange = (event) => {
    setShipCity(event.target.value);
  };
  const handleShipPincodeChange = (event) => {
    setShipPincode(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setCustomerName(event.target.value);
    Object.keys(customersData).map((customer) => {
      if (customersData[customer].custName === event.target.value) {
        setCustomerId(customersData[customer].custId);
        setProductsData(customersData[customer].purchaseOrder);
      }
    });
  };
  const handleProductChange = (event) => {
    setProductName(event.target.value);
    Object.keys(productsData).map((product) => {
      if (productsData[product].prodName === event.target.value) {
        setProductId(productsData[product].prodId);
      }
    });
  };

  async function fetchCustomersData() {
    axios
      .get("https://shopping-app22.herokuapp.com/shipping")
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


  const handleClear = () => {
    setShipAddress("");
    setShipCity(0);
    setShipPincode(0);
    setCustomerName("");
    setProductName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const prodData = {
      shipAddress: shipAddress,
      shipCity: shipCity,
      shipPincode: shipPincode,
      custId: customerId,
      prodId: productId
    };


    axios
      .post("https://shopping-app22.herokuapp.com/shipping", prodData)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setAlertOpen(true);
    handleClear();
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        onClose={handleAlertClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Shipping Details added Successfully!!
        </Alert>
      </Snackbar>

      <div className="container mt-5">
        <div className="container p-5 border">
          <h2>Shipping Details Form</h2>
          <form className="mt-4">
            <div className="row">
              <div className="col-12 col-md-12 col-sm-12">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Address"
                  variant="outlined"
                  value={shipAddress}
                  onChange={handleShipAddressChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-md-6 col-sm-12 mt-3">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="City"
                  variant="outlined"
                  value={shipCity}
                  onChange={handleShipCityChange}
                />
              </div>
              <div className="col-6 col-md-6 col-sm-12 mt-3">
                <TextField
                  id="outlined-basic"
                  type="number"
                  fullWidth
                  label="Pincode"
                  variant="outlined"
                  value={shipPincode}
                  onChange={handleShipPincodeChange}
                />
              </div>
            </div>
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
              <div className="col-6 col-md-6 col-sm-12 mt-3">
                <TextField
                  id="outlined"
                  select
                  fullWidth
                  label="Purchased Orders"
                  value={productName}
                  onChange={handleProductChange}
                  helperText="Select Product name"
                >
                  {Object.keys(productsData).map((product) => (
                    <MenuItem
                      key={productsData[product].prodId}
                      value={productsData[product].prodName}
                    >
                      {productsData[product].prodName}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-md-6 col-sm-12 mt-3">
                <button
                  type="button"
                  className="btn btn-secondary mt-3"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="btn btn-success mt-3 ms-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetailsForm;

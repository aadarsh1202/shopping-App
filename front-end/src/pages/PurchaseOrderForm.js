import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const PurchaseOrderForm = () => {
  const [prodName, setProdName] = useState("");
  const [prodQuantity, setProdQuantity] = useState(0);
  const [prodPrice, setProdPrice] = useState(0);
  const [prodMRP, setProdMRP] = useState(0);
  const [customersData, setCustomersData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [priceandMRP, setPriceandMRP] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleProdNameChange = (event) => {
    setProdName(event.target.value);
  };
  const handleProdQuantityChange = (event) => {
    setProdQuantity(event.target.value);
  };
  const handleProdPriceChange = (event) => {
    setProdPrice(event.target.value);
    handlePriceandMRPValidation();
  };
  const handleProdMRPChange = (event) => {
    setProdMRP(event.target.value);
    handlePriceandMRPValidation();
  };
  const handleCustomerChange = (event) => {
    setCustomerName(event.target.value);
    Object.keys(customersData).map((customer) => {
      if (customersData[customer].custName === event.target.value) {
        setCustomerId(customersData[customer].custId);
      }
    });
  };


  async function fetchCustomersData() {
    axios
      .get("https://shopping-app22.herokuapp.com/customers")
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


  const handlePriceandMRPValidation = () => {
    if (prodPrice <= prodMRP) {
      setPriceandMRP(false)
    }
    else {
      setPriceandMRP(true)
    }
  }
  const handleClear = () => {
    setProdName("");
    setProdQuantity(0);
    setProdPrice(0);
    setProdMRP(0);
    setCustomerName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const prodData = {
      prodName: prodName,
      prodQuantity: prodQuantity,
      prodPrice: prodPrice,
      prodMRP: prodMRP,
      custId: customerId
    };


    axios
      .post("https://shopping-app22.herokuapp.com/products", prodData)
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
          Purchase Order Added Successfully!!
        </Alert>
      </Snackbar>

      <div className="container mt-5">
        <div className="container p-5 border">
          <h2>Purchase Order Form</h2>
          <form className="mt-4">
            <div className="row">
              <div className="col-6 col-md-6 col-sm-12">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  value={prodName}
                  onChange={handleProdNameChange}
                />
              </div>
              <div className="col-6 col-md-6 col-sm-12">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  value={prodQuantity}
                  onChange={handleProdQuantityChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-md-6 col-sm-12 mt-3">
                <TextField
                  id="outlined-basic"
                  type="number"
                  fullWidth
                  label="Price"
                  variant="outlined"
                  value={prodPrice}
                  onChange={handleProdPriceChange}
                  error={priceandMRP === true ? true : false}
                  helperText={priceandMRP === true ? "Price can't be greater than MRP" : false}
                />
              </div>
              <div className="col-6 col-md-6 col-sm-12 mt-3">
                <TextField
                  id="outlined-basic"
                  type="number"
                  fullWidth
                  label="MRP"
                  variant="outlined"
                  value={prodMRP}
                  onChange={handleProdMRPChange}
                  error={priceandMRP === true ? true : false}
                  helperText={priceandMRP === true ? "Price can't be greater than MRP" : false}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-md-6 col-sm-12 mt-3">
                <TextField
                  id="outlined-select-currency"
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

export default PurchaseOrderForm;

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import Alert from "./components/Alert";
import Snackbar from "@mui/material/Snackbar";
import CustomersDetailList from "./components/CustomersDetailList";

const CustomersbyCity = () => {
  const [searchedCity, setSearchedCity] = useState("");
  const [customersData, setCustomersData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [noData, setNoData] = useState(false);

  const handleClear = () => {
    setSearchedCity("");

  };

  const handleSearchedCityChange = (event) => {
    setSearchedCity(event.target.value);

  };
  const handleSearchCity = () => {
    setNoData(false)
    if (searchedCity === "") {
      setAlertOpen(true);
      handleClear();
    }

    axios
      .post("https://shopping-app22.herokuapp.com/customerByCity", {
        city: searchedCity,
      })
      .then(function (response) {
        setCustomersData(response.data.data);
        if (Object.keys(response.data.data).length === 0 && searchedCity !== "") {
          setNoData(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderCustomersList = Object.keys(customersData).map((customer) => {
    return (
      <>
        <CustomersDetailList
          key={customer}
          srno={parseInt(customer) + 1}
          customer={customersData[customer]}
        />
      </>
    );
  });

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <Navbar />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        onClose={handleAlertClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Pease enter a city!!
        </Alert>
      </Snackbar>
      <div className="container mt-5">
        <div className="input-group flex-nowrap mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            value={searchedCity}
            placeholder="Search by City"
            onChange={handleSearchedCityChange}
          />

          <button type="button" className="btn btn-outline-secondary" onClick={handleSearchCity}>
            Search
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Customer Name</th>
                <th>Email Id</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>{renderCustomersList}</tbody>
          </table>
          {noData ? <div className="d-flex justify-content-center">No data Found.</div> : <div />}
        </div>
      </div>
    </>
  );
};

export default CustomersbyCity;

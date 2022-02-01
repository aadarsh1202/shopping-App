import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";


const CustomerForm = () => {

    const [custName, setCustName] = useState('');
    const [custEmailId, setCustEmailId] = useState('');
    const [custMobileNo, setCustMobileNo] = useState('');
    const [custCity, setCustCity] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);

    const handleCustNameChange = (event) => {
        setCustName(event.target.value)
    }
    const handleCustEmailIdChange = (event) => {
        setCustEmailId(event.target.value)
    }
    const handleCustMobileNoChange = (event) => {
        setCustMobileNo(event.target.value)
    }
    const handleCustCityChange = (event) => {
        setCustCity(event.target.value)
    }

    const handleClear = () => {
        setCustName('');
        setCustEmailId('');
        setCustMobileNo('');
        setCustCity('');
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        const custData = {
            'custName': custName,
            'custEmailId': custEmailId,
            'custMobileNo': custMobileNo,
            'custCity': custCity,
        }

        axios
            .post("https://shopping-app22.herokuapp.com/customers", custData)
            .then(function (response) {
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setAlertOpen(true);
        handleClear();
    }



    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (<div>
        <Navbar />
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={alertOpen}
            onClose={handleAlertClose}
            autoHideDuration={3000}
        >
            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                Customer Added Successfully!!
            </Alert>
        </Snackbar>

        <div className='container mt-5'>
            <div className="container p-5 border">
                <h2>Customer Details Form</h2>
                <form className='mt-4'>
                    <div className="row">
                        <div className="col-6 col-md-6 col-sm-12">
                            <TextField id="outlined-basic" fullWidth label="Customer Name" variant="outlined" value={custName} onChange={handleCustNameChange} />
                        </div>
                        <div className="col-6 col-md-6 col-sm-12">
                            <TextField id="outlined-basic" fullWidth label="Email ID" variant="outlined" value={custEmailId} onChange={handleCustEmailIdChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-6 col-sm-12 mt-3">
                            <TextField id="outlined-basic" type="number" fullWidth label="Mobile Number" variant="outlined" value={custMobileNo} onChange={handleCustMobileNoChange} />
                        </div>
                        <div className="col-6 col-md-6 col-sm-12 mt-3">
                            <TextField id="outlined-basic" fullWidth label="City" variant="outlined" value={custCity} onChange={handleCustCityChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-6 col-sm-12 mt-3">
                            <button type="button" className="btn btn-secondary mt-3" onClick={handleClear}>Clear</button>
                            <button type="submit" className="btn btn-success mt-3 ms-3" onClick={handleSubmit}>Submit</button>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    </div>);
};

export default CustomerForm;

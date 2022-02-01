import React from 'react';
import { NavLink} from "react-router-dom";


const Navbar = () => {

    
  return <>
    <nav className="navbar navbar-expand-lg navbar-dark  bg-primary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink className="navbar-brand" exact to="/home">
            <h3>Shopping App</h3>
          </NavLink>
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Customer Details Form
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/purchaseorderform" className="nav-link">
                Purchase Order
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/shippingdetailsform" className="nav-link">
                Shipping Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/customersbycity" className="nav-link">
              Customers by City
              </NavLink>
            </li>
  
            <li className="nav-item">
              <NavLink to="/customerdata" className="nav-link">
                Customer Data and Shopping details
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>;
};

export default Navbar;

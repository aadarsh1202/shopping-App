import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ProductsDetailsList = ({ product, srno }) => {
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [shippingDetails, setshippingDetails] = useState([]);
  
  const handleShowDetails = () => {
    if (!showShippingDetails) {
      setshippingDetails(product.shippingDetails);
    }
    setShowShippingDetails(!showShippingDetails);
  };
 

  return (
    <>
      <tr>
        <td>{srno}</td>
        <td>{product.prodName}</td>
        <td>{product.prodQuantity}</td>
        <td>{product.prodPrice}</td>
        <td>{product.prodMRP}</td>
        <td>
          {showShippingDetails ? (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleShowDetails}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Hide Details
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleShowDetails}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Show Details
            </button>
          )}
        </td>
      </tr>

      <Modal
        show={showShippingDetails}
        onHide={handleShowDetails}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Shipping Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shippingDetails.message === "data found" ? (
            <div>
              <p>Address : {shippingDetails.shipAddress}</p>
              <p>City : {shippingDetails.shipCity}</p>
              <p>Pincode : {shippingDetails.shipPincode}</p>
            </div>
          ) : (
            <p>Data not found</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductsDetailsList;

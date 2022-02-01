import React from "react";

const CustomersDetailList = ({customer,srno}) => {
  return (
    <tr>
      <td>{srno}</td>
      <td>{customer.custName}</td>
      <td>{customer.custEmailId}</td>
      <td>{customer.custMobileNo}</td>
    </tr>
  );
};

export default CustomersDetailList;

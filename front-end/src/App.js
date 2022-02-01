import {BrowserRouter as Router} from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import CustomersbyCity from './pages/CustomersbyCity';
import CustomerForm from './pages/CustomerForm';
import PurchaseOrderForm from './pages/PurchaseOrderForm';
import ShippingDetailsForm from './pages/ShippingDetailsForm';
import CustomerData from './pages/CustomerData'

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<CustomerForm/>} />
        <Route path="/purchaseorderform" exact element={<PurchaseOrderForm/>} />
        <Route path="/purchaseorderform" exact element={<PurchaseOrderForm/>} />
        <Route path="/shippingdetailsform" exact element={<ShippingDetailsForm/>} />
        <Route path="/customersbycity" exact element={<CustomersbyCity/>} />
        <Route path="/customerdata" exact element={<CustomerData/>} />
        
      </Routes>
    </Router>
  );
}

export default App;

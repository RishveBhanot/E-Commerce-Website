import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductsInfo from "./Components/Body/ProductsInfo";
import Home from "./Components/Body/Home";
import SearchItem from "./Components/Header/SearchProduct/SearchItem";
import CartPage from "./Components/Header/Page/CartPage";
import { ToastContainer } from "react-toastify";
import SignUp from "./Components/Header/Register/SignUp";
import Login from "./Components/Header/Register/Login";
import MainNavbar from "./Components/Header/MainNavbar";
import Navbar from "./Components/Header/Navbar";
import PersonalDetails from "./Components/Header/Page/PersonalDetails";
import PaymentDetails from "./Components/Header/Page/PaymentDetails";
import SelectPaymentMethod from "./Components/Header/Page/PaymentMethods/SelectPaymentMethod";
import SuccessPayment from "./Components/Header/Page/PaymentMethods/SuccessPayment";
import NetBanking from "./Components/Header/Page/PaymentMethods/NetBanking";
import Cod from "./Components/Header/Page/PaymentMethods/Cod";
import DebitCardCreditCard from "./Components/Header/Page/PaymentMethods/DebitCardCreditCard";


function App() {
  return (
    <>
      <Router>
        {/* <MainNavbar/> */}
        <Navbar/>
        <Routes>
          <Route path="/productInfo" element={<ProductsInfo />} />
          <Route path="/" element={<Home/>} />
          <Route path="/searchItem" element={<SearchItem/>}/>
          <Route path="/cartPage" element={<CartPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/personalDetails" element={<PersonalDetails/>}/>
          <Route path="/paymentDetails" element={<PaymentDetails/>}/>
          <Route path="/selectPaymentMethod" element={<SelectPaymentMethod/>}/>
          <Route path='/successPayment' element={<SuccessPayment/>}/>
          <Route path='/netBanking' element={<NetBanking/>}/>
          <Route path='/cod' element={<Cod/>}/>
          <Route path='/debitCardCreditCard' element={<DebitCardCreditCard/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;

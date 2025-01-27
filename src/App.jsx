import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainNavbar from './Components/Header/MainNavbar';
import Navbar from "./Components/Header/Navbar";
import ProductsInfo from "./Components/Body/ProductsInfo";
import Home from "./Components/Body/Home";
import SearchItem from "./Components/Header/SearchProduct/SearchItem";
import CartPage from "./Components/Header/Page/CartPage";

function App() {
  return (
    <>
      <Router>
        {/* <MainNavbar/>
        <Navbar /> */}
        <Routes>
          <Route path="/productInfo" element={<ProductsInfo />} />
          <Route path="/" element={<Home/>} />
          <Route path="/searchItem" element={<SearchItem/>}/>
          <Route path="/cartPage" element={<CartPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

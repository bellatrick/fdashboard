import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/EditProduct";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./context/store";
import Category from './pages/Category'
import Login from './pages/Login'
//import Signup from './pages/Registration'
import Messages from './pages/Messages'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
        <Route exact path="/" element={<Login/>} />
        {/* <Route exact path="/signup" element={<Signup/>} /> */}
          <Route exact path="/products" element={<Dashboard />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/product/edit" element={<EditProduct />} />
          <Route exact path="/category" element={<Category/>} />
          <Route exact path="/messages" element={<Messages/>} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </StoreProvider>
  );
}

export default App;

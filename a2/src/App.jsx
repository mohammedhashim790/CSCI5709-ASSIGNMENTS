import './App.css'
import {Navigation} from "./components/Navigation.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/home.jsx";
import {ProductList} from "./pages/products/list/product_list.jsx";
import {Contact} from "./pages/contact/contact.jsx";

function App() {
    return (<Router>
            <main>
                <Navigation/>
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/products" element={<ProductList/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/add" element={<Contact/>}/>
                    </Routes>
                </div>
            </main>
        </Router>);
}

export default App

import './App.css'
import {Navigation} from "./components/Navigation.jsx";
import {Route, Routes} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import {Home} from "./pages/home/home.jsx";
import {ProductList} from "./pages/products/product_list.jsx";
import {Contact} from "./pages/contact/contact.jsx";

function App() {
    return (
        <Router>
            <main>
                <Navigation />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </main>
        </Router>
    );
}

export default App

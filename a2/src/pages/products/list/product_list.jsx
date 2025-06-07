import {Product} from "./product.jsx";
import {useEffect, useState} from "react";
import {AddProduct} from "../add_product/add_product.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, fetchProducts, updateProduct} from "../../../store/actions.js";

export function ProductList() {
    // const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const dispatch = useDispatch();
    const {products, loading, toast} = useSelector(state => state);
    const handleAddProduct = (values) => {
        dispatch(createProduct(values));
    };
    const handleEditProduct = (values) => {
        dispatch(updateProduct({...values, id: editingProduct.id}));
    };
    const openProductForm = (product = null) => {
        debugger;
        setEditingProduct(product !== null);
        setIsModalOpen(true);

    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const clearToast = () => {
        dispatch({type: 'CLEAR_TOAST'});
    };


    return (<div className="product">
        <span className="action-button">
            <button className="button" onClick={() => openProductForm(null)}>
                Add Product
            </button>
        </span>
        <AddProduct
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={editingProduct}
            onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        />
        {loading && <div className="spinner">Loading...</div>}
        <div className="product-list">
            {products.map((product) => (<Product
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
            />))}
        </div>
    </div>);
}

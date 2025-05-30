import {Product} from "./product.jsx";

export function ProductList() {
    return (<div className="product">
        <span className="action-button">
            <button className="button">
                Add Product
            </button>
        </span>
        <div className="product-list">
            <Product
                image="/src/assets/shoe.jpg"
                title="Shoe"
                description="Fabric shoe"
                price="100"
            />

            <Product
                image="/src/assets/laptop.jpg"
                title="Laptop"
                description="Windows Laptop"
                price="240"
            />

            <Product
                image="/src/assets/smart-watch.jpg"
                title="Smart Watch"
                description="Smart Watch"
                price="120"
            />



        </div>
    </div>);
}

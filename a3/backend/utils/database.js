import {Product} from "./models.js";


export let productList = [new Product("/src/assets/laptop.jpg", "Laptop", "", 240), new Product("/src/assets/shoe.jpg", "Show", "", 100), new Product("/src/assets/smart-watch.jpg", "Smart Watch", "", 120)];


export const getAllProducts = () => {
    return productList;
}


export const getProduct = (id) => {
    const product = productList.find((product) => product.id === id);
    if (!product) {
        return product;
    }
    return {message: "Object not found"};
}

export const addProduct = (product) => {
    return productList.push(product);
}

export const deleteProduct = (id) => {
    const index = productList.findIndex(x => x.id === id);
    if (index > -1) {
        productList.splice(index, 1);
    }
    return productList;
}

export const updateProduct = (id, product) => {
    const index = productList.findIndex(x => x.id === id);
    if (index > -1) {
        productList[index] = product;
    }
    return product;
}



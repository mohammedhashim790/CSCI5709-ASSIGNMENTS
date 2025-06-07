export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCES = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
export const READ_PRODUCTS_REQUEST = 'READ_PRODUCTS_REQUEST';
export const READ_PRODUCT_SUCCESS = 'READ_PRODUCTS_SUCCESS';
export const READ_PRODUCTS_FAILURE = 'READ_PRODUCTS_FAILURE';
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILRE = 'DELETE_PRODUCT_FAILURE';

export const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
export const createProductSuccess = (product) => ({type: CREATE_PRODUCT_SUCCESS, payload: product});
export const createProductFailure = (error) => ({type: CREATE_PRODUCT_FAILURE, payload: error});
export const readProductsRequest = () => ({type: READ_PRODUCTS_REQUEST});
export const readProductsSuccess = (products) => ({type: READ_PRODUCT_SUCCESS, payload: products});
export const readProductsFailure = (error) => ({type: READ_PRODUCTS_FAILURE, payload: error});
export const updateProductRequest = () => ({type: UPDATE_PRODUCT_REQUEST});
export const updateProductSuccess = (product) => ({type: UPDATE_PRODUCT_SUCCES, payload: product});
export const updateProductFailure = (error) => ({type: UPDATE_PRODUCT_FAILURE, payload: error});
export const deleteProductRequest = () => ({type: DELETE_PRODUCT_REQUEST});
export const deleteProductSuccess = (id) => ({type: DELETE_PRODUCT_SUCCESS, payload: id});
export const deleteProductFailure = (error) => ({type: DELETE_PRODUCT_FAILRE, payload: error});

export const products = [{
    image: "/src/assets/shoe.jpg", title: "Shoe", description: "Fabric shoe", price: "100"
}, {
    image: "/src/assets/laptop.jpg", title: "Laptop", description: "Windows Laptop", price: "240",
}, {
    image: "/src/assets/smart-watch.jpg", title: "Smart Watch", description: "Smart Watch", price: "120",
}]

export const createProduct = (product) => (dispatch) => {
    dispatch(createProductRequest());
    try {
        setTimeout(() => {
            dispatch(createProductSuccess({...product, id: Date.now()}));
        }, 1000);
    } catch (error) {
        dispatch(createProductFailure(error.message));
    }
};

export const fetchProducts = () => (dispatch) => {
    dispatch(readProductsRequest());
    try {
        setTimeout(() => {
            dispatch(readProductsSuccess(products));
        }, 1000);
    } catch (error) {
        dispatch(readProductsFailure(error.message));
    }
};

export const updateProduct = (product) => (dispatch) => {
    dispatch(updateProductRequest());
    try {
        setTimeout(() => {
            dispatch(updateProductSuccess(product));
        }, 1000);
    } catch (error) {
        dispatch(updateProductFailure(error.message));
    }
};

export const deleteProduct = (id) => (dispatch) => {
    dispatch(deleteProductRequest());
    try {
        setTimeout(() => {
            dispatch(deleteProductSuccess(id));
        }, 1000);
    } catch (error) {
        dispatch(deleteProductFailure(error.message));
    }
};

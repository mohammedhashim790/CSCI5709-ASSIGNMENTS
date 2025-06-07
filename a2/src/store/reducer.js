const initialState = {
    products: [], error: null, toast: {message: '', type: ''}, loading: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PRODUCT_REQUEST':
        case 'READ_PRODUCTS_REQUEST':
        case 'UPDATE_PRODUCT_REQUEST':
        case 'DELETE_PRODUCT_REQUEST':
            return {...state, loading: true, error: null, toast: {message: '', type: ''}};
        case 'CREATE_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload],
                toast: {message: 'Product created', type: 'success'}
            };
        case 'READ_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload,
                toast: {message: 'Products loaded!', type: 'success'}
            };
        case 'UPDATE_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false,
                products: state.products.map(p => (p.id === action.payload.id ? action.payload : p)),
                toast: {message: 'Product updated!', type: 'success'}
            };
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false,
                products: state.products.filter(p => p.id !== action.payload),
                toast: {message: 'Product deleted!', type: 'success'}
            };
        case 'CREATE_PRODUCT_FAILURE':
        case 'READ_PRODUCTS_FAILURE':
        case 'UPDATE_PRODUCT_FAILURE':
        case 'DELETE_PRODUCT_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                toast: {message: 'Operation failed: ' + action.payload, type: 'error'}
            };
        default:
            return state;
    }
};

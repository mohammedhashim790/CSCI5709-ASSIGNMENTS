import React, {useEffect, useRef} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import './add_product.css';


const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
});

export function AddProduct({isOpen, onClose, product, onSubmit}) {
    const dialogRef = useRef(null);
    const initialValues = product || {title: '', image: '', description: '', price: ''};


    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    return (<dialog ref={dialogRef} onClose={onClose} className="dialog-body">
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm();
                onClose();
            }}
        >
            {() => (<Form>
                <div>
                    <label htmlFor="title">
                        Title
                    </label>
                    <span>
                        <Field
                            name="title"
                            type="text"
                        />
                    <ErrorMessage name="title" component="div" className="error-text"/>
                    </span>
                </div>
                <div>
                    <label htmlFor="image">
                        Image URL
                    </label>
                    <span>
                        <Field
                            name="image"
                            type="text"

                        />
                        <ErrorMessage name="image" component="div" className="error-text"/>
                    </span>
                </div>
                <div>
                    <label htmlFor="description">
                        Description
                    </label>
                    <span>
                        <Field
                            name="description"
                            as="textarea"
                        />
                    <ErrorMessage name="description" component="div" className="error-text"/>
                    </span>
                </div>
                <div>
                    <label htmlFor="price">
                        Price
                    </label>
                    <span>
                        <Field
                            name="price"
                            type="number"
                        />
                    <ErrorMessage name="price" component="div" className="error-text"/>
                    </span>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="small-button"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="small-button"
                    >
                        {product ? 'Update' : 'Add'} Product
                    </button>
                </div>
            </Form>)}
        </Formik>
    </dialog>);
}

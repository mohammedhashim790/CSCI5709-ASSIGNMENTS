import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import './signup.css';

const validationSchema = Yup.object({
    fullname: Yup.string().required('This field is required'),
    email: Yup.string().email('Invalid email').required('Must be a valid email format and is required'),
    phone: Yup.string().required('Must contain 10 to 15 digits only and is required'),
    password: Yup.string().required('Must be at least 6 characters long and is required'),
    confirmPassword: Yup.string().required('Must the password field and is required'),
});

export function SignUp() {


    const initialValues = {
        fullname: '', email: '', phone: '', password: '', confirmPassword: '',
    };

    return (<div className="signup-root">
        <div className="signup-card">
            <h1>
                Product Hunt
            </h1>
            <h2>Sign Up</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {
                }}>
                {() => (<Form>
                    <div>
                        <label htmlFor="fullname">Fullname</label>
                        <span>
                  <Field name="fullname" type="text"/>
                  <ErrorMessage name="fullname" component="div" className="error-text"/>
                </span>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <span>
                  <Field name="email" type="email"/>
                  <ErrorMessage name="email" component="div" className="error-text"/>
                </span>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <span>
                  <Field name="phone" type="text"/>
                  <ErrorMessage name="phone" component="div" className="error-text"/>
                </span>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <span>
                  <Field name="password" type="password"/>
                  <ErrorMessage name="password" component="div" className="error-text"/>
                </span>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <span>
                  <Field name="confirmPassword" type="password"/>
                  <ErrorMessage name="confirmPassword" component="div" className="error-text"/>
                </span>
                    </div>
                    <div>
                        <button type="submit">
                            Sign Up
                        </button>
                    </div>
                </Form>)}
            </Formik>
        </div>
    </div>);
}

import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import authSlice from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../styles/Login.css';

const baseURL = "http://localhost:8000/users/login";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const onSubmit = async (values, actions) => {
        axios
            .post(baseURL, values)
            .then((res) => {
                console.log(res.data);
                dispatch(
                    authSlice.actions.setAuthTokens({
                        token: res.data.token
                    })
                );

                dispatch(authSlice.actions.setAccount(res.data.username));
                console.log("Logged in");
                navigate("/profile");
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
        actions.resetForm();
    };

    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        isSubmitting,
        handleSubmit,
    } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Username is required"),
            password: Yup.string()
                .required("Password is required")
        }),
        onSubmit,
    });

    return (
        <div className="form-container">
            <h3>Login Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.username && errors.username ? "input-error" : ""}
                    />
                    {touched.username && errors.username ? (
                        <div className="error-message">{errors.username}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.password && errors.password ? "input-error" : ""}
                    />
                    {touched.password && errors.password ? (
                        <div className="error-message">{errors.password}</div>
                    ) : null}
                </div>

                {error && <div className="error-message">Username or password doesn't exist</div>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                >
                    Login
                </button>
            </form>

            <a href="/register" className="register-link">
                Don't have an account?
            </a>
        </div>
    );
};

export default Login;

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Import the CSS file

const baseURL= 'http://localhost:8000/users/register';

const Register = () => {
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        try {
            const response = await axios.post(baseURL, values);
            console.log(response);
            navigate("/login");
            actions.resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        handleSubmit,
        isSubmitting
    } = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "Must be at least 3 characters")
                .required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required")
        }),
        onSubmit
    });

    return (
        <div className="form-container">
            <h3>Signup Form</h3>
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
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.email && errors.email ? "input-error" : ""}
                    />
                    {touched.email && errors.email ? (
                        <div className="error-message">{errors.email}</div>
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

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;

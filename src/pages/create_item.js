import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import '../styles/CreateItem.css';

const baseURL = 'http://localhost:8000/items';  
const uploadURL = 'http://localhost:8000/items/upload';  

const CreateItem = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const onSubmit = async (values, actions) => {
        try {
            const response = await axios.post(baseURL, {
                ...values,
                end_time: new Date(values.end_time).toISOString()
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);
            navigate("/items");
            actions.resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageUpload = async (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(uploadURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            setFieldValue('image_url', response.data.imageUrl);
        } catch (error) {
            console.error(error);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        starting_price: Yup.number().required("Starting price is required").positive("Starting price must be positive"),
        description: Yup.string().required("Description is required"),
        end_time: Yup.date().required("End time is required").min(new Date(), "End time must be in the future")
    });

    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue
    } = useFormik({
        initialValues: {
            name: "",
            starting_price: "",
            image_url: "",
            description: "",
            end_time: ""
        },
        validationSchema,
        onSubmit
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Create Item
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Starting Price"
                    name="starting_price"
                    type="number"
                    value={values.starting_price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.starting_price && Boolean(errors.starting_price)}
                    helperText={touched.starting_price && errors.starting_price}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="End Time"
                    name="end_time"
                    type="datetime-local"
                    value={values.end_time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.end_time && Boolean(errors.end_time)}
                    helperText={touched.end_time && errors.end_time}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <input
                    type="file"
                    name="image"
                    onChange={(event) => handleImageUpload(event, setFieldValue)}
                    style={{ marginTop: '16px', marginBottom: '16px' }}
                />
                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                    >
                        Create Item
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default CreateItem;

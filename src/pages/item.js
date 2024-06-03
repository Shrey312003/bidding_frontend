import { useNavigate, useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from "axios";
import { useFormik } from "formik";
import { Modal, Box } from "@mui/material";
import { useSelector } from "react-redux";
import '../styles/Item.css';

const Item = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const url = `http://localhost:8000/items/${id}`;
    const baseURL = `http://localhost:8000/items/${id}`;
    const uploadURL = 'http://localhost:8000/items/upload';
    const token = useSelector(state => state.auth.token);

    const [open, setOpen] = useState(false);
    const { data, loading, error } = useFetch(url);
    const [data1, setData1] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        if (data) {
            setData1(data.data[0]);
        }
    }, [data]);

    const handleUpdate = () => {
        setOpen(true);
    };

    const handleDelete = async () => {
        try {
            const resp = await axios.delete(baseURL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(resp);
            navigate('/profile');
        } catch (error) {
            console.log(error);
            setDeleteError("Failed to delete item. Please try again.");
        }
    };

    const handleClose = () => setOpen(false);

    const onSubmit = async (values, actions) => {
        try {
            const response = await axios.put(baseURL, {
                ...values,
                end_time: new Date(values.end_time).toISOString()
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            handleClose();
            actions.resetForm();
            window.location.reload();
        } catch (error) {
            console.log(error);
            setUpdateError("Failed to update item. Please try again.");
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
        onSubmit
    });

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data1 && (
                <div className="items-container2">
                    <Card className="card">
                        <CardMedia
                            component="img"
                            image={`http://localhost:8000${data1.image_url}`}
                            alt={data1.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data1.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {data1.description}
                            </Typography>
                            <Typography>
                                Starting Price: {data1.starting_price}
                            </Typography>
                            <Typography>
                                Current Price: {data1.current_price}
                            </Typography>
                        </CardContent>
                        <CardActions className="button-group">
                            <Button variant="contained" color="primary" onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button variant="contained" color="primary" onClick={()=>navigate(`/bids/${id}`)}>
                                Bid
                            </Button>
                        </CardActions>
                        {deleteError && <Typography color="error">You are not authorized to delete the item</Typography>}
                    </Card>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="modal-box">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Update form
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name && (
                                        <Typography color="error">{errors.name}</Typography>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Starting Price</label>
                                    <input
                                        type="number"
                                        name="starting_price"
                                        value={values.starting_price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.starting_price && touched.starting_price && (
                                        <Typography color="error">{errors.starting_price}</Typography>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.description && touched.description && (
                                        <Typography color="error">{errors.description}</Typography>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>End Time</label>
                                    <input
                                        type="datetime-local"
                                        name="end_time"
                                        value={values.end_time}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.end_time && touched.end_time && (
                                        <Typography color="error">{errors.end_time}</Typography>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={(event) => handleImageUpload(event, setFieldValue)}
                                    />
                                    {errors.image_url && touched.image_url && (
                                        <Typography color="error">{errors.image_url}</Typography>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    variant="contained"
                                    color="primary"
                                    className="submit-button"
                                >
                                    Update Item
                                </Button>
                                {updateError && <Typography color="error">{updateError}</Typography>}
                            </form>
                        </Box>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default Item;

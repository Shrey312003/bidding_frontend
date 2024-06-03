import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import io from "socket.io-client";
import { Button, Modal, Box, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import '../styles/Bidding.css';

const Bidding = () => {
    const { id } = useParams();
    const baseURL = `http://localhost:8000/items/${id}/bids`;
    const { data, loading, error } = useFetch(baseURL);
    const [data1, setData1] = useState([]);
    const [socket, setSocket] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (data) {
            const sortedData = data.data.sort((a, b) => b.bid_amount - a.bid_amount);
            setData1(sortedData);
            console.log(sortedData);
        }
    }, [data]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = async (values, actions) => {
        const highestBid = data1.length > 0 ? data1[0].bid_amount : 0;
        const bidAmount = parseFloat(values.bid_amount);


        if (bidAmount <= highestBid) {
            actions.setFieldError("bid_amount", "Bid amount must be greater than the highest bid");
            return;
        }

        if (socket) {
            socket.emit("bid", { bid_amount: bidAmount, token: token });
            socket.emit("bid2", { bid_amount: bidAmount, token: token, item_id: id });
        }

        try {
            const response = await axios.post(baseURL, { ...values }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response);
            actions.resetForm();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object({
        bid_amount: Yup.number().required("Bid amount is required").positive("Bid amount must be positive")
    });

    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldError
    } = useFormik({
        initialValues: { bid_amount: "" },
        validationSchema,
        onSubmit
    });

    useEffect(() => {
        const newSocket = io("http://localhost:8000");

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to WebSocket");
        });

        newSocket.on("update", (msg) => {
            console.log(msg);
            if (msg) {
                setData1((prevData1) => {
                    const newData = [...prevData1, msg].sort((a, b) => b.bid_amount - a.bid_amount);
                    return newData;
                });
            }
        });

        return () => newSocket.close();
    }, []);

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Place a Bid
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className="modal-box">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter Bid Amount
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Bid Amount"
                            name="bid_amount"
                            value={values.bid_amount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.bid_amount && Boolean(errors.bid_amount)}
                            helperText={touched.bid_amount && errors.bid_amount}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Submit Bid
                        </Button>
                    </form>
                </Box>
            </Modal>
            <TableContainer component={Paper} className="bids-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Bidder</TableCell>
                            <TableCell align="right">Bid Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data1.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{item.user_id}</TableCell>
                                <TableCell align="right">{item.bid_amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Bidding;

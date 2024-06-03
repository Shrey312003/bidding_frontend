import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import io from "socket.io-client";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";
import '../styles/Notify.css';

const Notify = () => {
    const baseURL = `http://localhost:8000/notifications`;
    const { data, loading, error } = useFetch(baseURL);
    const [data1, setData1] = useState([]);
    const [socket, setSocket] = useState(null);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        if (data) {
            const sortedData = data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setData1(sortedData);
            console.log(sortedData);
        }
    }, [data]);

    useEffect(() => {
        const newSocket = io('http://localhost:8000');

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        newSocket.on('notify', (msg) => {
            console.log(msg);
            if (msg) {
                setData1(prevData1 => {
                    const newData = [...prevData1, msg].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    return newData;
                });
            }
        });

        return () => newSocket.close();
    }, []);

    const handleMarkRead = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8000/notifications/mark-read/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response);
            setData1(prevData1 =>
                prevData1.map(notif =>
                    notif.id === id ? { ...notif, is_read: true } : notif
                )
            );
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="notifications-container">
            <Typography variant="h4" component="h2" gutterBottom>
                Notifications
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Serial No.</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Read Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data1.map((notif, index) => (
                            <TableRow key={notif.id} className={notif.is_read ? 'read' : 'unread'}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{notif.message}</TableCell>
                                <TableCell>{new Date(notif.created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    {notif.is_read ? (
                                        "Read"
                                    ) : (
                                        <Button onClick={() => handleMarkRead(notif.id)} variant="contained" color="secondary">
                                            Mark as Read
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Notify;

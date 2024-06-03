import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import '../styles/Profile.css';

const Profile = () => {
    const url = 'http://localhost:8000/users/profile';
    const data_url = 'http://localhost:8000/items/user';
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(url);
    const { data: item_data, loading: item_loading, error: item_error } = useFetch(data_url);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);

    useEffect(() => {
        if (data) {
            setData1(data.data[0]);
            console.log(data.data[0]);
        }
    }, [data]);

    useEffect(() => {
        if (item_data) {
            setData2(item_data.data);
            console.log(item_data.data);
        }
    }, [item_data]);

    const handleClick = (id) => {
        navigate(`/items/${id}`);
    };

    return (
        <div className="profile-container">
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">Error: {error.message}</p>}
            {data1 && (
                <div>
                    <h3 className="profile-header">{data1.username}</h3>
                    {item_loading && <p className="loading-message">Loading items...</p>}
                    {item_error && <p className="error-message">Error loading items: {item_error.message}</p>}
                    {data2 && (
                        <ul className="item-list">
                            {data2.map((item) => (
                                <li key={item.id} className="item-card">
                                    <img src={`http://localhost:8000${item.image_url}`} alt={item.name} className="item-image" />
                                    <div className="item-info">
                                        <div className="item-name">{item.name}</div>
                                        <div className="item-description">{item.description}</div>
                                    </div>
                                    <button onClick={() => handleClick(item.id)} className="more-button">
                                        More
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;

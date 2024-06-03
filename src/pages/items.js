import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import '../styles/Items.css';

const Items = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const limit = 10;
    const navigate = useNavigate();

    const url = `http://localhost:8000/items?page=${page}&limit=${limit}`;
    const { data, loading, error } = useFetch(url);

    const [data1, setData1] = useState(null);

    useEffect(() => {
        if (data) {
            setData1(data.data);
        }
    }, [data]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handleClick = (id) => {
        console.log(id);
        navigate(`/items/${id}`);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredItems = data1?.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="items-wrapper">
            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="items-container">
                {filteredItems && filteredItems.map(item => (
                    <Card key={item.id} className="item-card2">
                        <CardMedia
                            component="img"
                            height="140"
                            image={`http://localhost:8000${item.image_url}`}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                            <Typography>
                                Starting Price: {item.starting_price}
                            </Typography>
                            <Typography>
                                Current Price: {item.current_price}
                            </Typography>
                            <Button onClick={() => handleClick(item.id)}>
                                More
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="pagination-buttons">
                <Button variant="contained" onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </Button>
                <Button variant="contained" onClick={handleNextPage}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Items;

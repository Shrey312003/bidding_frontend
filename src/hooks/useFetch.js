import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import authSlice from '../store/authSlice';
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

const useFetch = (url) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track errors

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(url);

    // console.log(token);

    const handleLogout = () => {
        
        dispatch(authSlice.actions.logout());
        console.log("Logged out");
        navigate(-1);
    }
    

    useEffect(()=>{
        // let isMounted = true;
        const fetch = async () => {
            try{
                const data1 = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                    setData(data1);
                    setLoading(false);
                    setError(null);
                
                
                // return data1;
            }catch(error){
                
                    console.log(error);
                    setError(error);
                    setLoading(false)
                    
            }
        }
        fetch();
    },[url, token, dispatch, navigate])
    return {data, loading, error};
}

export default useFetch;
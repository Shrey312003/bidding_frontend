import { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/login')
    },[])
    return (  
        <div>
        </div>
    );
}
 
export default Home;
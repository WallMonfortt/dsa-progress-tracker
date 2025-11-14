import { Link, useNavigate } from "react-router-dom";

const StartNowBtn = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        window.scrollTo(0, 0);
        navigate('/mainRoadmap');
    };

    return (
        <button 
            onClick={handleClick}
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
        >
            Comenzar Ahora
        </button>
    );
};

export default StartNowBtn;
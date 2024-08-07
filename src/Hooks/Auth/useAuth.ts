import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        navigate('/login');
        return;
    }
};

export default useAuth;

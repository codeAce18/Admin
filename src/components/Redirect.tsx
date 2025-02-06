import React, { useEffect } from 'react'
import { useAppContext } from '../context/index.tsx';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
    const { token } = useAppContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token]);

    return (
        <></>
    )
}

export default Redirect
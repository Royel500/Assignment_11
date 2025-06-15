import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from "react-router";
import Loading from '../Pages/Shear/Loading';

const PrivateRoute = ({ children }) => {
    const { user,loading } = useContext(AuthContext);
    if (loading) return <Loading></Loading>;
    return user ?  children : <Navigate to="/signIn" />;
};

export default PrivateRoute;
import React from 'react';
import { Navigate } from 'react-router';
import { getToken } from '../services/tokenService';

const withAuth = (Component) => {
    return (props) => {
        const isAuthenticated = getToken();

        if(!isAuthenticated){
            return <Navigate to="/signin" replace />
        }

        return <Component {...props} />
    };
};

export default withAuth;
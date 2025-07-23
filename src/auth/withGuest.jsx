import React from 'react';
import { Navigate } from 'react-router';
import { getToken } from './tokenService';

const withGuest = (Component) => {
    return (props) => {
        const isAuthenticated = getToken();

        if(isAuthenticated){
            return <Navigate to="/dashboard" replace />
        }

        return <Component {...props} />
    };
};

export default withGuest;
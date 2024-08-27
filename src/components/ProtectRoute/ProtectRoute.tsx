import { useIsAuthenticated } from '@hooks/Auth/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    return useIsAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

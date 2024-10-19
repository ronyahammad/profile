import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function Unauthorized({ children, requiredRole }) {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const useInfo = JSON.parse(localStorage.getItem('useInfo'));

    if (!accessToken || (useInfo && useInfo.role !== requiredRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

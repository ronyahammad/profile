import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../apps/slice/auth/AuthSlice';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Logout() {
    const dispatch = useDispatch();
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        const useInfo = JSON.parse(localStorage.getItem('useInfo'));
        if (useInfo && useInfo.role) {
            setRole(useInfo.role);
        }
        if (useInfo && useInfo.name) {
            setName(useInfo.name);
        }
    }, []);
    
    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include', 
            });
            dispatch(clearAuth()); 
        } catch (err) {
            console.error('Failed to logout', err);
        }
    };

    return (
        <Card sx={{ minWidth: 275,backgroundColor:'transparent' }}>
            <CardContent>
                <Typography variant="h5">
            Hello {name}!</Typography>
                <Typography variant="h6">
            This is your {role === 'admin' && (
                        <Link to="/admin">Admin Page</Link>
            )}
            {role === 'subscriber' && (
                        <Link to="/subscriber">Profile Page</Link>
                    )} </Typography> 
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleLogout}>Logout</Button></CardActions>
</Card>    
    

);
}

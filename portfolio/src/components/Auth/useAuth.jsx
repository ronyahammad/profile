import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRefreshTokenMutation } from '../../apps/slice/auth/AuthApiSlice';
import { setAccessToken, clearAuth } from '../../apps/slice/auth/AuthSlice';

export function useAuth() {
    const dispatch = useDispatch();
    const [refreshToken, { data, isLoading, error }] = useRefreshTokenMutation(); 

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedUseInfo = localStorage.getItem('useInfo'); 
        if (storedToken) {
            dispatch(setAccessToken({
                accessToken: storedToken,
                useInfo: JSON.parse(storedUseInfo)
            }));
        }
        const fetchNewAccessToken = async () => {
            try {
                await refreshToken().unwrap(); 
            } catch (err) {
                console.error('Error refreshing token', err);
                dispatch(clearAuth()); 
            }
        };
        if (!storedToken) {
            fetchNewAccessToken();
        }
    }, [dispatch, refreshToken]);

    useEffect(() => {
        if (data) {
            dispatch(setAccessToken(data.access_token)); 
        } else if (error) {
            dispatch(clearAuth()); 
        }
    }, [data, error, dispatch]);


    const accessToken = useSelector((state) => state.auth.accessToken);
    return { accessToken, isLoading };
}

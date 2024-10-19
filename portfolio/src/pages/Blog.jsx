import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../components/Auth/useAuth';
import { clearAuth } from '../apps/slice/auth/AuthSlice';
import { Box,styled } from '@mui/material'
import Stack from '@mui/material/Stack';
import Login from '../components/Auth/Login'
import Logout from '../components/Auth/Logout'
/* import {BlogList} from '../components/blogs/BlogList'; */
/* import Divider from '@mui/material'; */

const BoxType = styled('div')(({ theme }) => ({
    top: '10vh',
    width: '100%',
    paddingLeft: '30%',
    paddingRight:'20%',
    justifyContent: "center",
    zIndex: '9',
    position: 'absolute'
}))
export default function Blog(){
    const accessToken = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();
    const { isLoading: isRefreshing } = useAuth(); 
    useAuth();

    useEffect(() => {
        if (!accessToken) {
            dispatch(clearAuth());
        }
    }, [accessToken, dispatch]);
    
    if (isRefreshing) {
        return <p>Loading session, please wait...</p>; 
    }

    return(
        <BoxType>
            <Stack
                direction={{ xs: 'column', sm: 'column',lg:'row' }}
                spacing={{ xs: 2, sm: 2, md: 4,lg:80 }}
            >
                <Box><h2>Welcome to the blog page!</h2></Box>
                <Box>{!accessToken ? <Login /> : <Logout />}</Box>
            </Stack>
           {/* <Divider/>  */}
 {/*            <BlogList/>
 */}        </BoxType>
    )

}
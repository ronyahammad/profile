import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../apps/slice/auth/AuthApiSlice';
import { setAccessToken } from '../../apps/slice/auth/AuthSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    useEffect(() => {
        if (accessToken) {
            console.log('Login successful, token received:', accessToken);
            navigate('/blog');
        }
    }, [accessToken, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setAccessToken({
                accessToken: result.access_token, 
                useInfo: result.useInfo
            }));

        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Accordion
                    expanded={expanded}
                    onChange={handleExpansion}
                    slots={{ transition: Fade }}
                    slotProps={{ transition: { timeout: 400 } }}
                    sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none', 
                        border: 'none', 
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                            borderBottom: '2px solid #1976d2', 
                            paddingBottom: expanded ? '8px' : '0px', 
                        }}
                    >
                        <Typography variant="h5" component="div">
                            Sign in
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography component="div">
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Typography>
                        <Typography component="div">
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Typography>
                        <Button
                            variant="outlined"
                            endIcon={<SendIcon />}
                            onClick={handleLogin}
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                        {error && <Typography color="error">Error: {error.toString()}</Typography>}
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Avatar, TextField, Alert, Button, Typography, Box, Paper, Grid } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form"

import myImage from '../../assets/logo.jpg';
import BusinessDetails from '../general/businessDetails';

export default function LoginPage() {

    const { register, handleSubmit , reset} = useForm();
    const [isError, setIsError] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const navigate=useNavigate();
    function onSubmit1(data) {
        axios.post('http://localhost:8787/login', data)
            .then(function (response) {
                setIsAuth(true);
                window.location.pathname='admin/service';
            })
            .catch(function (error) {
                setIsError(true);
                reset();
            });
    }


    return (<>
        <Grid container component="main" >
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${myImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                }}
            />
            <Grid 
            item xs={12} sm={8} md={5} elevation={9} 
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        
                    }}
                >
                    <Avatar sx={{ bgcolor: "#4654A3" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit1)}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...register("name")}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            required
                            fullWidth
                            {...register("password")}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                    </form>
                    {isError && <Alert severity="error">Username or password is incorrect, please try again</Alert>}
                </Box>
            </Grid>

        </Grid >
        {isAuth && <BusinessDetails admin={true} />}

    </>
    );
}

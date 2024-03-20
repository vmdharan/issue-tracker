import React, { FormEvent, useState } from 'react';
import { LoginPropsType } from './types';
import UserService from 'services/user';
import Typography from 'components/atoms/Typography';
import Button from 'components/atoms/Button';
import TextField from 'components/atoms/TextField';
import Grid from 'components/atoms/Grid';
import loginBackgroundImage from '../../../assets/login_bg.jpg';

const Login = ({ setToken }: LoginPropsType) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await UserService.LoginUser({ userName, password });
        if (result?.token) {
            setToken(result);
        } else {
            console.log(result.errors[0]);
        }
    };

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    minHeight: '100vh',
                    backgroundImage: `url(${loginBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Grid
                    item
                    xs={4}
                    sx={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: 'white',
                    }}
                >
                    <Typography variant="h4">Log in to the portal</Typography>
                    <form onSubmit={handleLogin} style={{ minWidth: '360px' }}>
                        <TextField
                            fullWidth
                            type="text"
                            color="primary"
                            label="Username"
                            onChange={(e) => setUserName(e.target.value)}
                            sx={{ marginTop: '1.5rem', display: 'block' }}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            color="primary"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ marginTop: '1.5rem', display: 'block' }}
                        />
                        <Button
                            sx={{ marginTop: '1.5rem', float: 'right' }}
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Log in
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;

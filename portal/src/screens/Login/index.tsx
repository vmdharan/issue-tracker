import React, { FormEvent, useState } from 'react';
import { LoginPropsType } from './types';
import UserService from 'services/user';
import Typography from 'components/atoms/Typography';
import Button from 'components/atoms/Button';
import TextField from 'components/atoms/TextField';

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
            <Typography variant='h4'>Login form</Typography>
            <form onSubmit={handleLogin}>
                <>
                    <TextField
                        type="text" color="primary" label='Username'
                        onChange={(e) => setUserName(e.target.value)}
                        sx={{marginTop: '1.5rem', display: 'block'}}
                    />
                </>
                <>
                    <TextField
                        type="password" color="primary" label='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{marginTop: '1.5rem', display: 'block'}}
                    />
                </>
                <div style={{marginTop: '1.5rem'}}>
                    <Button color='primary' variant='contained' type="submit">Log in</Button>
                </div>
            </form>
        </>
    );
};

export default Login;

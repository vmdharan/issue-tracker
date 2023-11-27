import React, { FormEvent, useState } from "react";
import { LoginPropsType } from "./types";
import UserService from 'services/user';

const Login = ({setToken}: LoginPropsType) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await UserService.LoginUser({userName, password});
        if(result?.token) {
            setToken(result.token);
        } else {
            console.log(result.errors[0]);
        }
    }

    return (
        <>
        <p>Login form</p>
        <form onSubmit={handleLogin}>
            <>Username: <input type='text' onChange={(e) => setUserName(e.target.value)} /></>
            <>Password: <input type='password' onChange={(e) => setPassword(e.target.value)} /></>
            <><button type='submit'>Log in</button></>
        </form>
        </>
    );
};

export default Login;
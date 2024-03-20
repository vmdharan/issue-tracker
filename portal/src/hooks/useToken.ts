import { useState } from 'react';
import { CurrentSessionTokenPropsType } from '~/types/token';

const useToken = () => {
    const CURRENT_SESSION = 'currentSession';
    const getSessionToken = () => {
        const tokenString = sessionStorage.getItem(CURRENT_SESSION);
        if (!tokenString) {
            return null;
        }
        const currentSession = JSON.parse(tokenString);
        return currentSession?.token;
    };

    const saveSessionToken = (currentSession: CurrentSessionTokenPropsType) => {
        sessionStorage.setItem(CURRENT_SESSION, JSON.stringify(currentSession));
        setToken(currentSession?.token);
        setLoggedInUser(currentSession?.name);
    };

    const clearSessionToken = () => {
        sessionStorage.removeItem(CURRENT_SESSION);
        setToken(null);
        setLoggedInUser(null);
    };

    const getLoggedInUser = () => {
        const tokenString = sessionStorage.getItem(CURRENT_SESSION);
        if (!tokenString) {
            return null;
        }
        const currentSession = JSON.parse(tokenString);
        return currentSession?.name;
    };

    const [token, setToken] = useState(getSessionToken());
    const [loggedInUser, setLoggedInUser] = useState(getLoggedInUser());

    return {
        token,
        loggedInUser,
        setToken: saveSessionToken,
        clearToken: clearSessionToken,
    };
};

export default useToken;

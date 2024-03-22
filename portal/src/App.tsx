import React, { useEffect, useState } from 'react';
import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';
import SideNav from 'components/organisms/SideNav';
import MainContent from 'components/organisms/MainContent';
import { RouteObject, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Login from 'components/pages/Login';
import useToken from 'hooks/useToken';

import Dashboard from 'components/pages/Dashboard';
import ErrorPage from 'components/pages/ErrorPage';

import useSchema from 'hooks/useSchema';

const router = (elementRoutes: RouteObject[]) => createBrowserRouter([
    {
        Component: Root,
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <Dashboard />, errorElement: <ErrorPage /> },
            ...elementRoutes,
        ],
    },
]);

function Root() {
    const { clearToken } = useToken();
    const navigate = useNavigate();

    console.log('render root')

    const handleLogout = () => {
        clearToken();
        navigate(0);
    };

    return (
        <>
            <Header handleLogout={handleLogout} />
            <SideNav />
            <MainContent />
            <Footer />
        </>
    );
}

const App = () => {
    const { token, setToken } = useToken();
    const { elementRoutes } = useSchema();
    console.log('render app');

    const [er, setER] = useState<RouteObject[]>([]);
    useEffect(() => {
        setER(elementRoutes);
    },[elementRoutes])

    if (!token) {
        return <Login setToken={setToken} />;
    }
    if(!elementRoutes) {
        return <></>;
    }
    return <RouterProvider router={router(er)} />;
};

export default App;

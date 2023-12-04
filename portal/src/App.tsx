import React from 'react';
import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';
import SideNav from 'components/organisms/SideNav';
import MainContent from 'components/organisms/MainContent';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Dashboard from 'screens/Dashboard';
import ErrorPage from 'screens/ErrorPage';
import Tickets from 'screens/Tickets';
import Organisations from 'screens/Organisations';
import Users from 'screens/Users';
import TicketCategories from 'screens/TicketCategories';
import TicketSeverities from 'screens/TicketSeverities';
import ProductCategories from 'screens/ProductCategories';
import Products from 'screens/Products';
import Login from './screens/Login';
import useToken from './hooks/useToken';

const router = createBrowserRouter([
    {
        Component: Root,
        children: [
            { path: '/', element: <Dashboard />, errorElement: <ErrorPage /> },
            {
                path: '/tickets',
                element: <Tickets />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/ticket-severities',
                element: <TicketSeverities />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/ticket-categories',
                element: <TicketCategories />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/products',
                element: <Products />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/product-categories',
                element: <ProductCategories />,
                errorElement: <ErrorPage />,
            },
            { path: '/users', element: <Users />, errorElement: <ErrorPage /> },
            {
                path: '/organisations',
                element: <Organisations />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

function Root() {
    const { clearToken } = useToken();
    const navigate = useNavigate();

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

    if (!token) {
        return <Login setToken={setToken} />;
    }
    return <RouterProvider router={router} />;
};

export default App;

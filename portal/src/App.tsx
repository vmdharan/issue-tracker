import React from 'react';
import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';
import SideNav from 'components/organisms/SideNav';
import MainContent from 'components/organisms/MainContent';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Dashboard from 'components/pages/Dashboard';
import ErrorPage from 'components/pages/ErrorPage';
import Tickets from 'components/pages/Tickets';
import Organisations from 'components/pages/Organisations';
import Users from 'components/pages/Users';
import TicketCategories from 'components/pages/TicketCategories';
import TicketSeverities from 'components/pages/TicketSeverities';
import ProductCategories from 'components/pages/ProductCategories';
import Products from 'components/pages/Products';
import Login from 'components/pages/Login';
import useToken from 'hooks/useToken';
import CreateEditForm from 'components/organisms/CreateEditForm';
import { UserCreateFormProps, UserEditFormProps } from 'schemas/user';

const router = createBrowserRouter([
    {
        Component: Root,
        children: [
            { path: '/', element: <Dashboard />, errorElement: <ErrorPage /> },
            {
                path: '/tickets',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '',
                        element: <Tickets />,
                    },
                    {
                        path: 'create',
                        element: <ErrorPage />,
                    },
                    {
                        path: 'edit/:id',
                        element: <ErrorPage />,
                    },
                ],
            },
            {
                path: '/ticket-severities',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '',
                        element: <TicketSeverities />,
                    },
                    {
                        path: 'create',
                        element: <ErrorPage />,
                    },
                    {
                        path: 'edit/:id',
                        element: <ErrorPage />,
                    },
                ],
            },
            {
                path: '/ticket-categories',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '',
                        element: <TicketCategories />,
                    },
                    {
                        path: 'create',
                        element: <ErrorPage />,
                    },
                    {
                        path: 'edit/:id',
                        element: <ErrorPage />,
                    },
                ],
            },
            {
                path: '/products',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '',
                        element: <Products />,
                    },
                    {
                        path: 'create',
                        element: <ErrorPage />,
                    },
                    {
                        path: 'edit/:id',
                        element: <ErrorPage />,
                    },
                ],
            },
            {
                path: '/product-categories',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '',
                        element: <ProductCategories />,
                    },
                    {
                        path: 'create',
                        element: <ErrorPage />,
                    },
                    {
                        path: 'edit/:id',
                        element: <ErrorPage />,
                    },
                ],
            },
            {
                path: '/users',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '',
                        element: <Users />,
                    },
                    {
                        path: 'create',
                        element: <CreateEditForm {...UserCreateFormProps} />,
                    },
                    {
                        path: 'edit/:id',
                        element: <CreateEditForm {...UserEditFormProps} />,
                    },
                ],
            },
            {
                path: '/organisations',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '',
                        element: <Organisations />,
                    },
                    {
                        path: 'create',
                        element: <ErrorPage />,
                    },
                    {
                        path: 'edit/:id',
                        element: <ErrorPage />,
                    },
                ],
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

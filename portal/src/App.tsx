import React from 'react';
import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';
import SideNav from 'components/organisms/SideNav';
import MainContent from 'components/organisms/MainContent';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Dashboard from 'components/pages/Dashboard';
import ErrorPage from 'components/pages/ErrorPage';
import Login from 'components/pages/Login';
import useToken from 'hooks/useToken';
import CreateEditForm from 'components/organisms/CreateEditForm';
import ItemContent from './components/organisms/ItemContent';
import { ElementContentProps, ElementEditFormProps } from './schemas/types';
import { UserCreateFormProps, UserEditFormProps, UserItemContentProps } from 'schemas/user';

const MakeElementRoute = (elementPath: string, contentProps: ElementContentProps | null, createFormProps: ElementEditFormProps | null, editFormProps: ElementEditFormProps | null) => {
    return {
        path: elementPath,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: contentProps ? <ItemContent {...contentProps} /> : <ErrorPage />,
            },
            {
                path: 'create',
                element: createFormProps ? <CreateEditForm {...createFormProps} /> : <ErrorPage />,
            },
            {
                path: 'edit/:id',
                element: editFormProps ? <CreateEditForm {...editFormProps} /> : <ErrorPage />,
            },
        ]
    };
}

const router = createBrowserRouter([
    {
        Component: Root,
        children: [
            { path: '/', element: <Dashboard />, errorElement: <ErrorPage /> },
            MakeElementRoute('/tickets', null, null, null),
            MakeElementRoute('/ticket-severities', null, null, null),
            MakeElementRoute('/ticket-categories', null, null, null),
            MakeElementRoute('/products', null, null, null),
            MakeElementRoute('/product-categories', null, null, null),
            MakeElementRoute('/users', UserItemContentProps, UserCreateFormProps, UserEditFormProps),
            MakeElementRoute('/organisations', null, null, null),
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

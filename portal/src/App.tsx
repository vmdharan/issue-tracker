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
import {
    UserCreateFormProps,
    UserEditFormProps,
    UserItemContentProps,
} from 'schemas/user';
import {
    TicketSeverityCreateFormProps,
    TicketSeverityEditFormProps,
    TicketSeverityItemContentProps,
} from './schemas/ticket_severity';
import {
    TicketCategoryCreateFormProps,
    TicketCategoryEditFormProps,
    TicketCategoryItemContentProps,
} from './schemas/ticket_category';
import {
    TicketCreateFormProps,
    TicketEditFormProps,
    TicketItemContentProps,
} from './schemas/ticket';
import {
    ProductCreateFormProps,
    ProductEditFormProps,
    ProductItemContentProps,
} from './schemas/product';
import {
    ProductCategoryCreateFormProps,
    ProductCategoryEditFormProps,
    ProductCategoryItemContentProps,
} from './schemas/product_category';
import {
    OrganisationCreateFormProps,
    OrganisationEditFormProps,
    OrganisationItemContentProps,
} from './schemas/organisation';

const MakeElementRoute = (
    elementPath: string,
    contentProps: ElementContentProps | null,
    createFormProps: ElementEditFormProps | null,
    editFormProps: ElementEditFormProps | null,
) => {
    return {
        path: elementPath,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: contentProps ? (
                    <ItemContent {...contentProps} />
                ) : (
                    <ErrorPage />
                ),
            },
            {
                path: 'create',
                element: createFormProps ? (
                    <CreateEditForm {...createFormProps} />
                ) : (
                    <ErrorPage />
                ),
            },
            {
                path: 'edit/:id',
                element: editFormProps ? (
                    <CreateEditForm {...editFormProps} />
                ) : (
                    <ErrorPage />
                ),
            },
        ],
    };
};

const router = createBrowserRouter([
    {
        Component: Root,
        children: [
            { path: '/', element: <Dashboard />, errorElement: <ErrorPage /> },
            MakeElementRoute(
                '/tickets',
                TicketItemContentProps,
                TicketCreateFormProps,
                TicketEditFormProps,
            ),
            MakeElementRoute(
                '/ticket-severities',
                TicketSeverityItemContentProps,
                TicketSeverityCreateFormProps,
                TicketSeverityEditFormProps,
            ),
            MakeElementRoute(
                '/ticket-categories',
                TicketCategoryItemContentProps,
                TicketCategoryCreateFormProps,
                TicketCategoryEditFormProps,
            ),
            MakeElementRoute(
                '/products',
                ProductItemContentProps,
                ProductCreateFormProps,
                ProductEditFormProps,
            ),
            MakeElementRoute(
                '/product-categories',
                ProductCategoryItemContentProps,
                ProductCategoryCreateFormProps,
                ProductCategoryEditFormProps,
            ),
            MakeElementRoute(
                '/users',
                UserItemContentProps,
                UserCreateFormProps,
                UserEditFormProps,
            ),
            MakeElementRoute(
                '/organisations',
                OrganisationItemContentProps,
                OrganisationCreateFormProps,
                OrganisationEditFormProps,
            ),
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

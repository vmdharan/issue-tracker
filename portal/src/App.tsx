import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideNav from 'components/SideNav';
import MainContent from 'components/MainContent';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from 'screens/Dashboard';
import ErrorPage from 'screens/ErrorPage';
import Tickets from 'screens/Tickets';
import Organisations from 'screens/Organisations';
import Users from 'screens/Users';
import TicketCategories from 'screens/TicketCategories';
import TicketSeverities from 'screens/TicketSeverities';
import ProductCategories from 'screens/ProductCategories';
import Products from 'screens/Products';

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
    return (
        <>
            <Header />
            <SideNav />
            <MainContent />
            <Footer />
        </>
    );
}

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;

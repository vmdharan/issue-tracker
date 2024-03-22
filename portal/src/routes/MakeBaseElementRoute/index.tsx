import React, { ReactElement } from 'react';
import ErrorPage from 'components/pages/ErrorPage';

const MakeBaseElementRoute = (
    elementPath: string,
    elementProps: ReactElement
) => {
    return {
        path: elementPath,
        element: elementProps,
        errorElement: <ErrorPage />
    };
};

export default MakeBaseElementRoute;

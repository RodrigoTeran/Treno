import React from 'react';
import Nav from '../../Nav/Dashboard/DashboardNav';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FunctionComponent = (): JSX.Element => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
};

export default DashboardLayout;

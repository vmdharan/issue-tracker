import React from "react";
import MakeBaseElementRoute from "routes/MakeBaseElementRoute";
import Dashboard from "components/pages/Dashboard";

const DashboardSchema = {};

const DashboardElementRoute = MakeBaseElementRoute(
    '/', <Dashboard />
);

const DashboardNavLink = {
    target: '/',
    label: 'Dashboard',
    icon: 'dashboard',
};

export default DashboardSchema;
export { DashboardElementRoute, DashboardNavLink };

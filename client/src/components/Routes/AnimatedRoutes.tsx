import React, {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import {routesNoScrollY} from "./config";

// Pages
import Home from '../../pages/Home/Home';
import LogIn from '../../pages/LogIn/LogIn';
import SignUp from '../../pages/SignUp/SignUp';
import Dashboard from '../../pages/Dashboard/Dashboard';

// Layout
import Layout from '../Layout/Layout';

const AnimatedRoutes: React.FunctionComponent = (): JSX.Element => {
    const location = useLocation();

    useEffect(() => {
        const body = document.querySelector("body");
        if (body === null) return;
        
        if (routesNoScrollY.includes(location.pathname)) {
            body.style.overflowY = "hidden";
            return;
        }
        body.style.overflowY = "auto";
    }, [location.pathname]);

    return (
        <AnimatePresence mode='wait'>
            <Routes key={location.pathname} location={location}>
                <Route path="/" element={<Layout isDashboard={false} />}>
                    <Route index element={<Home />} />
                    <Route path="iniciar-sesion" element={<LogIn />} />
                    <Route path="crear-cuenta" element={<SignUp />} />
                </Route>
                <Route path="aplicacion" element={<Layout isDashboard />}>
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import Nav from '../../Nav/Dashboard/DashboardNav';
import { Outlet } from 'react-router-dom';

// Context
export const DashboardLayoutContext = createContext<Partial<DashboardLayoutValueProvider>>({});

interface DashboardLayoutValueProvider {
    hamburgerOpen: boolean;
    setHamburgerOpen: Dispatch<SetStateAction<boolean>>
}

const DashboardLayout: React.FunctionComponent = (): JSX.Element => {
    const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);

    return (
        <DashboardLayoutContext.Provider value={{
            hamburgerOpen,
            setHamburgerOpen
        }}>
            <Nav />
            <Outlet />
        </DashboardLayoutContext.Provider>
    );
};

export default DashboardLayout;

import React, { useState, createContext, Dispatch, SetStateAction, useContext } from 'react';
import Nav from '../../Nav/Dashboard/DashboardNav';
import { AppContext } from "../../../App";
import { Outlet } from 'react-router-dom';
import { DEVICE } from "../../../types/devices.types";

// Modals
import PopUpModal from "../../Modals/PopUpModal";
import { LinkDevice } from "../../../pages/Dashboard/Menu/Menu";

// Context
export const DashboardLayoutContext = createContext<Partial<DashboardLayoutValueProvider>>({});

interface DashboardLayoutValueProvider {
    hamburgerOpen: boolean;
    setHamburgerOpen: Dispatch<SetStateAction<boolean>>;
    devices: Array<DEVICE>;
    setDevices: Dispatch<SetStateAction<Array<DEVICE>>>;

    refetchDevices: boolean;
    setRefetchDevices: Dispatch<SetStateAction<boolean>>
}

const DashboardLayout: React.FunctionComponent = (): JSX.Element => {
    const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
    const [refetchDevices, setRefetchDevices] = useState<boolean>(false);
    const [devices, setDevices] = useState<Array<DEVICE>>([]);
    const { isModalLink, setIsModalLink } = useContext(AppContext);

    return (
        <DashboardLayoutContext.Provider value={{
            hamburgerOpen,
            setHamburgerOpen,
            devices,
            setDevices,
            refetchDevices,
            setRefetchDevices
        }}>
            <PopUpModal isOpen={isModalLink} setIsOpen={setIsModalLink}>
                <LinkDevice />
            </PopUpModal>
            <Nav />
            <Outlet />
        </DashboardLayoutContext.Provider>
    );
};

export default DashboardLayout;

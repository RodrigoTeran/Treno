import React, { useState, createContext, Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import Nav from '../../Nav/Dashboard/DashboardNav';
import { AppContext } from "../../../App";
import { Outlet } from 'react-router-dom';
import { DEVICE } from "../../../types/devices.types";

// Modals
import PopUpModal from "../../Modals/PopUpModal";
import { LinkDevice } from "../../../pages/Dashboard/Menu/Menu";
import { RoomModal } from "../../../pages/Dashboard/Body/Room/Room";

import { stablishConnection, STABLISH_CONNECTION_QUERY } from "../../../routes/socket.types";
import { ServerToClientEvents, ClientToServerEvents } from "../../../types/socket.types";
import { io, Socket } from 'socket.io-client';

// Context
export const DashboardLayoutContext = createContext<Partial<DashboardLayoutValueProvider>>({});

interface DashboardLayoutValueProvider {
    hamburgerOpen: boolean;
    setHamburgerOpen: Dispatch<SetStateAction<boolean>>;
    devices: Array<DEVICE>;
    setDevices: Dispatch<SetStateAction<Array<DEVICE>>>;

    socket: React.MutableRefObject<Socket<
        ServerToClientEvents,
        ClientToServerEvents
    > | null>;
}

const DashboardLayout: React.FunctionComponent = (): JSX.Element => {
    const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
    const [devices, setDevices] = useState<Array<DEVICE>>([]);
    const { isModalLink, setIsModalLink, user, isModalDevice, setIsModalDevice } = useContext(AppContext);

    const socket = useRef<Socket<
        ServerToClientEvents,
        ClientToServerEvents
    > | null>(null);

    const connectSocket = (): void => {
        if (user === null || user === undefined) return;
        if (socket.current !== null) return;

        const clientId: number = user.id;
        const query: STABLISH_CONNECTION_QUERY = {
            clientId
        };

        socket.current = io(`${stablishConnection}`, {
            query,
        });
    };

    useEffect(() => {
        connectSocket();
        // eslint-disable-next-line
    }, [user]);

    return (
        <DashboardLayoutContext.Provider value={{
            hamburgerOpen,
            setHamburgerOpen,
            devices,
            setDevices,
            socket
        }}>
            <PopUpModal isOpen={isModalLink} setIsOpen={setIsModalLink}>
                <LinkDevice />
            </PopUpModal>
            <PopUpModal isOpen={isModalDevice} setIsOpen={setIsModalDevice}>
                <RoomModal />
            </PopUpModal>
            <Nav />
            <Outlet />
        </DashboardLayoutContext.Provider>
    );
};

export default DashboardLayout;

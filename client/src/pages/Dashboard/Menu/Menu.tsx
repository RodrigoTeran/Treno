import React, { useContext, useState } from 'react';
import styles from "./Menu.module.scss";
import { DashboardLayoutContext } from "../../../components/Layout/Dashboard/DashboardLayout";
import { AppContext } from "../../../App";
import { Link } from 'react-router-dom';
import InputText from "../../../components/Form/Input/Input";
import BtnSpinner from "../../../components/Buttons/Block/Block";
import { linkDevice, LINK_DEVICE_BODY } from "../../../routes/dashboard.types";
import { RESPONSE_DATA } from "../../../routes/index.routes";
import { fetcher, RESPONSE } from "../../../utils/fetcher";

const Cross = () => {
    return (
        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.27455 6L11.686 2.58852C12.1047 2.16989 12.1047 1.49114 11.686 1.07216L10.9278 0.313977C10.5092 -0.104659 9.83045 -0.104659 9.41148 0.313977L6 3.72545L2.58852 0.313977C2.16989 -0.104659 1.49114 -0.104659 1.07216 0.313977L0.313977 1.07216C-0.104659 1.4908 -0.104659 2.16955 0.313977 2.58852L3.72545 6L0.313977 9.41148C-0.104659 9.83011 -0.104659 10.5089 0.313977 10.9278L1.07216 11.686C1.4908 12.1047 2.16989 12.1047 2.58852 11.686L6 8.27455L9.41148 11.686C9.83011 12.1047 10.5092 12.1047 10.9278 11.686L11.686 10.9278C12.1047 10.5092 12.1047 9.83045 11.686 9.41148L8.27455 6Z" />
        </svg>

    )
}

export const LinkDevice = () => {
    const { setMessages, setIsModalLink } = useContext(AppContext);
    const { setRefetchDevices } = useContext(DashboardLayoutContext);

    const [deviceKey, setDeviceKey] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const linkDeviceFunction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const doFetch = async (): Promise<void> => {
            try {
                const body: LINK_DEVICE_BODY = {
                    key: deviceKey
                }
                setIsLoading(true);
                const dataFetch: RESPONSE = await fetcher[linkDevice.method]({ uri: linkDevice.url, body });
                setIsLoading(false);
                const resData: RESPONSE_DATA = dataFetch.data;
                setDeviceKey("");

                if (resData.readMsg) {
                    if (!setMessages) return;
                    setMessages(prev => [
                        ...prev, {
                            type: resData.typeMsg,
                            msg: resData.message,
                            index: new Date().getTime() + prev.length
                        }
                    ])
                }

                if (!setRefetchDevices) return;
                if (!setIsModalLink) return;
                setRefetchDevices(prev => !prev);
                setIsModalLink(false);

            } catch (error) {
                setIsLoading(false);
                console.error(error);
                setDeviceKey("");
                if (!setMessages) return;
                setMessages(prev => [
                    ...prev, {
                        type: "danger",
                        msg: "Error al obtener los dispositivos.",
                        index: new Date().getTime() + prev.length
                    }
                ])
            }
        }

        void doFetch();
    }

    return (
        <div className={styles.link}>
            <div className={styles.link_title}>
                Enlazar
            </div>
            <form onSubmit={linkDeviceFunction} className={styles.link_form}>
                <InputText
                    text="Clave del dispositivo"
                    inputValue={deviceKey}
                    setInputValue={setDeviceKey}
                    id="input-new-device"
                    isRequired
                    typeInput="text"
                />
                <BtnSpinner
                    family="cyan-500"
                    text="Enlazar"
                    role="submit"
                    attribute='btn-link-device'
                    isLoading={isLoading}
                />
            </form>
        </div>
    )
}

const Menu: React.FunctionComponent = (): JSX.Element => {
    const { hamburgerOpen, setHamburgerOpen } = useContext(DashboardLayoutContext);
    const { setIsModalLink } = useContext(AppContext);

    return (
        <div className={`${styles.menu} ${hamburgerOpen && styles.menu_open}`}>
            <div className={styles.menu_title}>
                <Link to="/">
                    Treno
                </Link>
            </div>
            <section className={styles.menu_section}>
                <div onClick={() => {
                    if (!setIsModalLink) return;

                    setIsModalLink(true);
                }} className={styles.menu_section_point}>
                    Enlazar
                </div>
            </section>
            <div onClick={() => {
                if (!setHamburgerOpen) return;

                setHamburgerOpen(false);
            }} className={styles.cross}>
                <Cross />
            </div>
        </div>
    );
};

export default Menu;

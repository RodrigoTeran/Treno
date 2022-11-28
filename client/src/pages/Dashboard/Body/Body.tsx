import React, { useContext, useEffect, useState } from 'react';
import styles from "./Body.module.scss";
import { DashboardLayoutContext } from "../../../components/Layout/Dashboard/DashboardLayout";
import { getDevices as getDevicesRoute, GET_DEVICES_DATA } from "../../../routes/dashboard.types";
import { RESPONSE_DATA } from "../../../routes/index.routes";
import { fetcher, RESPONSE } from "../../../utils/fetcher";
import { AppContext } from "../../../App";
import { DEVICE } from '../../../types/devices.types';

// Icons
import { SofaIcon } from "./Icons/index";


const Body: React.FunctionComponent = (): JSX.Element => {
    const { hamburgerOpen, setDevices, devices, refetchDevices } = useContext(DashboardLayoutContext);
    const { setMessages } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDevices = (): void => {
        const doFetch = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const dataFetch: RESPONSE = await fetcher[getDevicesRoute.method]({ uri: getDevicesRoute.url });
                setIsLoading(false);
                const resData: RESPONSE_DATA = dataFetch.data;

                if (resData.readMsg) {
                    if (!setMessages) return;
                    setMessages(prev => [
                        ...prev, {
                            type: resData.typeMsg,
                            msg: resData.message,
                            index: new Date().getTime() + prev.length
                        }
                    ])
                    return;
                }

                const data: GET_DEVICES_DATA = resData.data;
                if (!setDevices) return;
                setDevices(data.devices);

            } catch (error) {
                setIsLoading(false);
                console.error(error);
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

    useEffect(() => {
        getDevices();
        // eslint-disable-next-line
    }, [refetchDevices]);

    if (isLoading) return (
        <div>

        </div>
    )

    return (
        <div className={`${styles.body} ${hamburgerOpen && styles.body_open}`}>
            <div className={styles.links_title}>
                <span>Habitaciones</span> enlazadas
            </div>
            <div className={styles.status}>
                Tu perrito se está comportando muy bien
            </div>
            <div className={styles.links_grid}>
                {devices && devices.map((device: DEVICE, index: number) => {
                    return (
                        <div key={device.id} className={styles.links_card}>
                            <div className={styles.links_card_icon}>
                                <SofaIcon />
                            </div>
                            <div className={styles.links_card_info}>
                                <div className={styles.links_card_info_name}>
                                    {device.place || `Habitación ${index + 1}`}

                                </div>
                                <div className={styles.links_card_info_go}>
                                    Visitar
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Body;

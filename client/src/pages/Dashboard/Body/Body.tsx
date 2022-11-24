import React, { useContext } from 'react';
import styles from "./Body.module.scss";
import { DashboardLayoutContext } from "../../../components/Layout/Dashboard/DashboardLayout";

const Body: React.FunctionComponent = (): JSX.Element => {
    const { hamburgerOpen } = useContext(DashboardLayoutContext);

    return (
        <div className={`${styles.body} ${hamburgerOpen && styles.body_open}`}>
            Body
        </div>
    );
};

export default Body;

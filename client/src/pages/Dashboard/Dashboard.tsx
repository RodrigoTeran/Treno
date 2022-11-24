import React from 'react';
import Menu from "./Menu/Menu";
import Body from "./Body/Body";
import styles from "./Dashboard.module.scss";

const Dashboard: React.FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.dashboard}>
            <Menu />
            <Body />
        </div>
    );
};

export default Dashboard;

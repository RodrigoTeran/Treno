import React from 'react';
import Nav from '../../Nav/Landing/LandingNav';
import { Outlet } from 'react-router-dom';
import styles from './LandingLayout.module.scss';

const LandingLayout: React.FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.layout}>
            <Nav />
            <div className={styles.layout_pad}>
                <Outlet />
            </div>
        </div>
    );
};

export default LandingLayout;

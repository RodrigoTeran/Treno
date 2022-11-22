import React from 'react';
import styles from './Loader.module.scss';


const Loader: React.FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.spinner}>
            super loader
        </div>
    );
};

export default Loader;

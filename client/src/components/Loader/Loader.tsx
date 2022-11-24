import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.spinner}>
            <div style={{
                "--delay": "0ms"
            } as React.CSSProperties} className={styles.spinner_block}></div>
            <div style={{
                "--delay": "60ms"
            } as React.CSSProperties} className={styles.spinner_block}></div>
            <div style={{
                "--delay": "120ms"
            } as React.CSSProperties} className={styles.spinner_block}></div>
            
        </div>
    );
};

export default Loader;

import React from 'react';
import styles from './Loader.module.scss';

interface Props {
    attribute?: string
}

const Loader: React.FunctionComponent<Props> = ({
    attribute
}): JSX.Element => {
    return (
        <div className={styles.spinner} extra-css={attribute}>
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

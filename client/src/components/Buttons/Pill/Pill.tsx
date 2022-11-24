import React from 'react';
import styles from "./Pill.module.scss";

interface Props {
    family: "cyan-500" | "light-000",
    text: string,
    callback: () => void,
    attribute?: string
}

const Pill: React.FunctionComponent<Props> = ({
    family,
    text,
    callback,
    attribute
}): JSX.Element => {
    return (
        <button extra-css={attribute} onClick={callback} className={`${styles.btn} ${styles[family]}`}>{text}</button>
    );
};

export default Pill;

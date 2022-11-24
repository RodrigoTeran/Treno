import React from 'react';
import styles from "./Block.module.scss";

interface Props {
    family: "cyan-500" | "light-000",
    text: string,
    callback?: () => void,
    attribute?: string
    role?: string
}

const Block: React.FunctionComponent<Props> = ({
    family,
    text,
    callback,
    attribute,
    role
}): JSX.Element => {
    return (
        <button role={role} extra-css={attribute} onClick={callback} className={`${styles.btn} ${styles[family]}`}>{text}</button>
    );
};

export default Block;

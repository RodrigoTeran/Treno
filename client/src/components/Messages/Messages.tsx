import React, { useContext } from 'react';
import styles from "./Messages.module.scss";
import { AppContext } from "../../App";
import { MESSAGE } from "../../types/messages.types";

const Info = () => {
    return (
        <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0C3.13428 0 0 3.13541 0 7C0 10.8668 3.13428 14 7 14C10.8657 14 14 10.8668 14 7C14 3.13541 10.8657 0 7 0ZM7 3.10484C7.65473 3.10484 8.18548 3.6356 8.18548 4.29032C8.18548 4.94505 7.65473 5.47581 7 5.47581C6.34527 5.47581 5.81452 4.94505 5.81452 4.29032C5.81452 3.6356 6.34527 3.10484 7 3.10484ZM8.58064 10.2742C8.58064 10.4612 8.42899 10.6129 8.24193 10.6129H5.75806C5.57101 10.6129 5.41935 10.4612 5.41935 10.2742V9.59677C5.41935 9.40972 5.57101 9.25806 5.75806 9.25806H6.09677V7.45161H5.75806C5.57101 7.45161 5.41935 7.29996 5.41935 7.1129V6.43548C5.41935 6.24843 5.57101 6.09677 5.75806 6.09677H7.56452C7.75157 6.09677 7.90323 6.24843 7.90323 6.43548V9.25806H8.24193C8.42899 9.25806 8.58064 9.40972 8.58064 9.59677V10.2742Z" />
        </svg>
    )
}

const Danger = () => {
    return (
        <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 7C14 10.8668 10.8657 14 7 14C3.13428 14 0 10.8668 0 7C0 3.13541 3.13428 0 7 0C10.8657 0 14 3.13541 14 7ZM7 8.41129C6.28292 8.41129 5.70161 8.9926 5.70161 9.70968C5.70161 10.4268 6.28292 11.0081 7 11.0081C7.71708 11.0081 8.29839 10.4268 8.29839 9.70968C8.29839 8.9926 7.71708 8.41129 7 8.41129ZM5.76729 3.74427L5.97667 7.58298C5.98647 7.7626 6.13499 7.90323 6.31488 7.90323H7.68512C7.86501 7.90323 8.01353 7.7626 8.02333 7.58298L8.23271 3.74427C8.24329 3.55024 8.08881 3.3871 7.8945 3.3871H6.10547C5.91116 3.3871 5.75671 3.55024 5.76729 3.74427Z" />
        </svg>

    )
}

const Success = () => {
    return (
        <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.41538 9.8036L0.190373 5.44535C-0.0634576 5.18351 -0.0634576 4.75898 0.190373 4.49711L1.10959 3.54888C1.36342 3.28702 1.775 3.28702 2.02883 3.54888L4.875 6.48478L10.9712 0.196377C11.225 -0.0654589 11.6366 -0.0654589 11.8904 0.196377L12.8096 1.14461C13.0635 1.40645 13.0635 1.83098 12.8096 2.09285L5.33462 9.80363C5.08076 10.0655 4.66921 10.0655 4.41538 9.8036Z" />
        </svg>
    )
}

const Cross = () => {
    return (
        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.27455 6L11.686 2.58852C12.1047 2.16989 12.1047 1.49114 11.686 1.07216L10.9278 0.313977C10.5092 -0.104659 9.83045 -0.104659 9.41148 0.313977L6 3.72545L2.58852 0.313977C2.16989 -0.104659 1.49114 -0.104659 1.07216 0.313977L0.313977 1.07216C-0.104659 1.4908 -0.104659 2.16955 0.313977 2.58852L3.72545 6L0.313977 9.41148C-0.104659 9.83011 -0.104659 10.5089 0.313977 10.9278L1.07216 11.686C1.4908 12.1047 2.16989 12.1047 2.58852 11.686L6 8.27455L9.41148 11.686C9.83011 12.1047 10.5092 12.1047 10.9278 11.686L11.686 10.9278C12.1047 10.5092 12.1047 9.83045 11.686 9.41148L8.27455 6Z" />
        </svg>

    )
}


const Messages: React.FunctionComponent = (): JSX.Element => {
    const { messages, setMessages } = useContext(AppContext);

    const deleteMsg = (index: number) => {
        if (!messages) return;
        if (!setMessages) return;

        let aux: Array<MESSAGE> = [];

        for (let i = 0; i < messages.length; i++) {
            if (messages[i].index === index) continue;

            aux.push(messages[i]);
        }

        setMessages(aux);
    }

    const getMessages = (): Array<MESSAGE> => {
        if (!messages) return [];

        if (messages.length > 6) {
            return messages.slice(messages.length - 6, messages.length)
        }

        return messages;
    }

    return (
        <div className={styles.msgs}>
            {getMessages().map((msg: MESSAGE, index: number) => {
                return (
                    <div key={`${msg.msg}-${msg.index}-${index}`} className={`${styles.msg} ${styles[msg.type]}`}>
                        <div className={styles.svg}>
                            {msg.type === "info" && <Info />}
                            {msg.type === "danger" && <Danger />}
                            {msg.type === "success" && <Success />}
                        </div>
                        <div className={styles.text}>
                            {msg.msg}
                        </div>
                        <div title='Cerrar mensaje' onClick={() => {
                            deleteMsg(msg.index);
                        }} className={styles.cross}>
                            <Cross />
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Messages;

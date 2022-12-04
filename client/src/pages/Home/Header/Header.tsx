import React from 'react';
import styles from "./Header.module.scss";
import Btn from "../../../components/Buttons/Pill/Pill";

const Header: React.FunctionComponent = (): JSX.Element => {
    return (
        <div className={`${styles.header} landing_section`}>
            <div className={styles.header_left}>
                <div className={styles.header_left_title}>
                    <span className={styles.header_left_title_cyan}>Tr</span>
                    <span>eno</span>
                </div>
                <p>El mejor entrenador de mascotas virtual ahora en tus manos</p>
                <div className={styles.header_left_btns_container}>
                    <Btn attribute='btn-header' text='Contáctanos' family="cyan-500" callback={() => { }} />
                    <Btn attribute='btn-header' text='Producto' family="light-000" callback={() => { }} />
                </div>
            </div>
            <img src="svgs/dog.svg" alt="" />
        </div>
    );
};

export default Header;

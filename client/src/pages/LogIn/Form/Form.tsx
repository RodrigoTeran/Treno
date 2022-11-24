import React, { useState } from 'react';
import styles from "./Form.module.scss";
import InputText from "../../../components/Form/Input/Input";
import Btn from "../../../components/Buttons/Block/Block";
import { variantsChildren, variantsContainer } from "../../../animations/stagger";
import { motion } from "framer-motion";

const LogInForm: React.FunctionComponent = (): JSX.Element => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const logIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: login
    }

    return (
        <div className={styles.form_container}>
            <motion.form
                variants={variantsContainer}
                initial="hidden"
                exit="exit"
                animate="visible"
                onSubmit={logIn}
                className={styles.card}>
                <motion.div variants={variantsChildren} className={styles.card_title}>
                    Iniciar Sesión
                </motion.div>
                <motion.div variants={variantsChildren} className={styles.input_container}>
                    <InputText
                        text='Nombre de usuario'
                        inputValue={username}
                        setInputValue={setUsername}
                        id="input-username-login"
                        isRequired
                        typeInput="text" />
                    <InputText
                        text="Contraseña"
                        inputValue={password}
                        setInputValue={setPassword}
                        id="input-password-login"
                        isRequired
                        typeInput="password" />
                </motion.div>
                <motion.div variants={variantsChildren}>
                    <Btn
                        family="cyan-500"
                        text="Iniciar sesión"
                        attribute="btn-log-in"
                        role='submit'
                    />
                </motion.div>
            </motion.form>
        </div>
    );
};

export default LogInForm;

import React, { useState, useContext } from 'react';
import styles from "./Form.module.scss";
import InputText from "../../../components/Form/Input/Input";
import Btn from "../../../components/Buttons/Block/Block";
import { variantsChildren, variantsContainer } from "../../../animations/stagger";
import { motion } from "framer-motion";
import { fetcher, RESPONSE } from "../../../utils/fetcher";
import { signUp as signUpRoute, SIGNUP_BODY } from "../../../routes/auth.routes";
import { RESPONSE_DATA } from "../../../routes/index.routes";
import { useAuth } from "../../../hooks/useAuth";
import { AppContext } from "../../../App";

const SignUpForm: React.FunctionComponent = (): JSX.Element => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [deviceKey, setDeviceKey] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setUser, setIsAuth, setMessages } = useContext(AppContext);

    const fetchUser = useAuth({
        setUser,
        setIsAuth,
    });

    const signUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const doFetch = async (): Promise<void> => {
            try {
                const body: SIGNUP_BODY = {
                    username,
                    password,
                    deviceKey,
                    confirmPassword
                }
                setIsLoading(true);
                const res: RESPONSE = await fetcher[signUpRoute.method]({ uri: signUpRoute.url, body });
                setIsLoading(false);
                const resData: RESPONSE_DATA = res.data;
                if (resData.readMsg && setMessages) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            msg: resData.message,
                            type: resData.typeMsg,
                            index: new Date().getTime() + prev.length
                        }
                    ]);
                    return;
                }

                if (resData.isAuth) {
                    // All fine
                    fetchUser();
                }

            } catch (error) {
                console.error(error);
                setIsLoading(false);
                if (!setMessages) return;
                setMessages((prev) => [
                    ...prev,
                    {
                        msg: "Error al iniciar sesión... Actualice la página.",
                        type: "danger",
                        index: new Date().getTime() + prev.length
                    }
                ]);
            };
        };

        void doFetch();
    }

    return (
        <div className={styles.form_container}>
            <motion.form
                variants={variantsContainer}
                initial="hidden"
                exit="exit"
                animate="visible"
                onSubmit={signUp}
                className={styles.card}>
                <motion.div variants={variantsChildren} className={styles.card_title}>
                    Crear cuenta
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
                        id="input-password-signup"
                        isRequired
                        typeInput="password" />
                    <InputText
                        text="Confirmar contraseña"
                        inputValue={confirmPassword}
                        setInputValue={setConfirmPassword}
                        id="input-confirm-password-signup"
                        isRequired
                        typeInput="password" />
                    <InputText
                        text='Clave del dispositivo'
                        inputValue={deviceKey}
                        setInputValue={setDeviceKey}
                        id="input-device-key"
                        isRequired
                        typeInput="text" />
                </motion.div>
                <motion.div variants={variantsChildren}>
                    <Btn
                        family="cyan-500"
                        text="Crear cuenta"
                        attribute="btn-log-in"
                        role='submit'
                        isLoading={isLoading}
                    />
                </motion.div>
            </motion.form>
        </div>
    );
};

export default SignUpForm;

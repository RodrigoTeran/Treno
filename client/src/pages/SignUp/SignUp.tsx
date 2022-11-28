import React from 'react';
import SignUpForm from "./Form/Form"
import styles from "./SignUp.module.scss";
import { Helmet } from "react-helmet-async";
import ModelViewer from "../../components/WebGl/Model";

const LogIn: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Treno | Crear cuenta</title>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <h1>
            Crear cuenta
          </h1>
          <p>
            Para crear una cuenta debes de contar con un dispositivo Treno. Cada dispositivo Treno tiene un código único en el reverso del dispositivo.
          </p>
          <div className={styles.canvas}>
            <ModelViewer scale={2} modelPath={"modelo.glb"} />
          </div>
        </div>
        <SignUpForm />
      </div>
    </>
  );
};

export default LogIn;

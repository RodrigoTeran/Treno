import React from 'react';
import LogInForm from "./Form/Form"
import { Helmet } from "react-helmet-async";

const LogIn: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Treno | Iniciar sesión</title>
      </Helmet>
      <LogInForm />
    </>
  );
};

export default LogIn;

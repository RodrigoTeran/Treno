import React from 'react';
import Header from "./Header/Header";
import { Helmet } from "react-helmet-async";

const Home: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Treno</title>
      </Helmet>
      <Header />
    </>
  );
};

export default Home;

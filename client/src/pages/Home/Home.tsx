import React from 'react';
import Header from "./Header/Header";
import { Helmet } from "react-helmet-async";

const Home: React.FunctionComponent = (): JSX.Element => {
  return (
    <div>
      <Helmet>
        <title>Treno</title>
      </Helmet>
      <Header />
    </div>
  );
};

export default Home;

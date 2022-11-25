import React from "react";
import Head from "next/head";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Titulo from "./components/Titulo";

// import Copa from "./components/Copa";

const MasterCUP = () => {
  return (
    <>
      <Head>
        <title>MasterCUP | 2022</title>
        <link rel="icon" href="../images/escudo.png" />
      </Head>

      <Nav />
      <Titulo
        primary={"Master CUP 2022"}
        secondary={"Clasificaciones y Resultados."}
      />
      <Footer />
    </>
  );
};

export default MasterCUP;
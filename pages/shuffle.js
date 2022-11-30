import React from 'react'
import Head from 'next/head'
import Nav from './components/Nav'
import Footer from './components/Footer'

import Titulo from './components/Titulo'

import Game from './components/Master'

const Shuffle = () => {
  return (
    <>
      <Head>
        <title>MasterCUP | Shuffle</title>
        <link rel="icon" href="../images/escudo.png" />
      </Head>

      <Nav />
      <Titulo primary={"Torneo VeMasterCUP"} secondary={"Clasificaciones y Resultados."} />
      
      <div className='Game flex w-full'>
        <Game />
      </div>

      <Footer />
    </>
  )
}

export default Shuffle


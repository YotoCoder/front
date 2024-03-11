import React from 'react'
import Image from 'next/image'

export default function Nosotros() {
  return (
    <div className='flex flex-col lg:flex-row ml- bg-[#111111] -translate-y-28 items-start justify-between'>
        <div className='lg:w-3/4'>
        <Image
            src='/images/logohorizontalvmc.png'
            alt='Venezuela Master CUP'
            width={500}
            height={500}
            className='mx-auto'
        />
        </div>
        <div className='flex flex-col gap-4 p-4 m-auto'>
            <h1 className='text-white font-light text-3xl'>
                Venezuela Master Cup
            </h1>
            <h2 className='text-gray-300 font-light text-xl'>
                VMC es un proyecto de Esports en rápido crecimiento. 
            </h2>
            <h2 className='text-gray-300 font-light text-xl break-all'>
                Nuestra misión es popularizar los Esports profesionales y organizar torneos para apoyar a la comunidad Venezolana y Latinoamericana.<br></br><br></br>
                Nuestro objetivo es proporcionar una plataforma en línea segura y justa para que los jugadores de Dota 2 puedan competir y mejorar sus habilidades.<br></br><br></br>
                Estamos comprometidos a mantener un entorno de juego amistoso y respetuoso para todos los participantes.
            </h2>
        </div>
    </div>
  )
}

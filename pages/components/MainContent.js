import Link from "next/link"

const MainContent = () => {
  return (
    <div className='flex relative lg:top-0 flex-col items-center justify-start top-[-10vh] h-screen  z-[20] w-screen lg:h-max lg:w-full'
         style={{
            backgroundImage: `url('../images/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
         }}
    >
      {/* fuego derecha */}
     
      <img src='../images/fire-right.png' alt='fire'
           className=' absolute animate-pulse w-28 top-0 right-0 z-[-10]'
      />
      <img src='../images/fire-right.png' alt='fire'
           className='fire-right absolute animate-pulse w-28 top-4 right-0 z-[-10]'
      />
      <img src='../images/fire-right.png' alt='fire'
           className='fire-right absolute animate-pulse w-28 top-20 right-0 z-[-10]'
      />
      <img src='../images/fire-right.png' alt='fire'
           className=' absolute animate-pulse w-28 top-28 right-0 z-[-10]'
      />
     
      {/* fuego izquierda */}
      <img src='../images/fire-left.png' alt='fire'
            className=' absolute animate-pulse w-28 top-4 left-0 z-[-10]'
      />

      {/* heroes | escudo */}
      <div className="escudoSmall lg:hidden relative top-[-5vh] lg:top-10 ">
          <div className='relative top-[15vh]'>
            <img src='../images/escudo.png' alt='escudo' className='relative visible lg:invisible w-[35vh]'
            />
          </div>
      </div>
      <div className='flex items-center justify-between ' >
          {/* heroe izquierda */}
          <img src='../images/hero-left.png' alt='hero-left' className='heroM w-[45%] lg:w-[25%] lg:mx-1' />

            {/* escudo */}
            <div className='relative right-4 lg:top-[-5vh]'>
              <img src='../images/escudo.png' alt='escudo' className='lg:visible invisible lg:w-[60vh]'
              />
            </div>
          {/* heroe derecha */}
          <img src='../images/hero-right.png' alt='hero-right' className='lina relative w-[35%] lg:top-0 top-[-2vh] lg:w-[20%] mx-2' />
      </div>
        

      {/* texto */}
      <div className='flex flex-col relative items-center top-[-2vh] lg:top-[-6vh] '>
         {/* fecha */}
         
            <div className='fecha'>
                <p className='text-3xl lg:text-5xl'>NOV 30 - DIC 13</p>
            </div>
         
         {/* modalidad */}
          <div className='modalidad'>
            <p className='relative top-1 text-2xl lg:text-3xl'>ONLINE</p>
          </div>

          {/* prize pool */}
          <div className="flex items-center divPrizePool m-2 px-4">
            <div className='prize-pool pr-2'>
              <p className='text-3xl lg:text-4xl'>GANADOR: </p>
            </div>
            
            <div className=''>
              <p className='prize-pool-amount text-3xl lg:text-5xl'>BIZ GAMING</p>
            </div>

          </div>
      </div>

        <div className='flex relative lg:top-[-4vh] items-center justify-around '>
          {/* sponsor */}
          <img src='../images/sponsors.png' alt='sponsors' className='relative sponsor object-cover w-[55%]' />

          {/* boton */}
          <Link type='button' href='/torneo' value=''  >
            <p className='flex flex-row relative registrarBtn mx-4 px-10 p-3 lg:p-6 lg:px-16 h-full'>
              VER 
            </p>
          </Link>
        </div>
    </div>
  )
}

export default MainContent
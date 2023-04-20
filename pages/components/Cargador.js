import React from 'react'
import { BallTriangle } from 'react-loader-spinner';

const Cargador = ({height}) => {
  return (
    <div className={`flex flex-col text-white justify-center items-center
                      ${!height ? "h-screen": height} `}>
        <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#ffc860"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
        />
        <b className='p-4'>
            Cargando...
        </b>
    </div>
  )
}

export default Cargador
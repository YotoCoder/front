import React, { useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";

export default function ModalFlyer() {
    
    useEffect(()=>{
        document.getElementById('my_modal_1').showModal()
    })
  
  return (
    <div>
    <dialog id="my_modal_1" className="modal">
    <div className="flex items-center justify-center flex-col modal-box bg-black text-white">
        <h3 className="font-bold text-lg">Ya Disponible!<br></br>Registro del Torneo Clasificatorio IESF WEC 2024</h3>
        <Image
            className='flex items-center my-4 shadow-md shadow-[#F6B52E] justify-center bg-center bg-cover bg-no-repeat rounded-lg'
            src="/images/flyervmciesfwec24.png"
            alt="Flyer del torneo VMC 2024"
            width={300} height={300}
        />
        <p className='pt-2 font-sans font-bold'>Deseas Inscribirte ahora?</p>
        <div className="modal-action">
        <form method="dialog">
            <div className="flex gap-2">
                <Link className="btn bg-[#F6B52E] text-black" href="/registro-torneo-iesf-wec-2024">Registrarme</Link>
                <button className="btn">Cerrar</button>
            </div>
        </form>
        </div>
    </div>
    </dialog>
    </div>
  )
}

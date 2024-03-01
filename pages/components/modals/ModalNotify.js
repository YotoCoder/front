import React, { useEffect } from 'react'

export const ModalNotify = ({titulo, textoPrincipal, textoSecundario, textoBoton}) => {
    
    useEffect(()=>{
        document.getElementById('my_modal_1').showModal()
    })
  
  return (
    <div>
    <dialog id="my_modal_1" className="modal">
    <div className="modal-box bg-black text-white">
        <h3 className="font-bold text-lg">Bienvenido a Venezuela Master CUP!</h3>
        <p className="py-4">{textoPrincipal}</p>
        <p>{textoSecundario}</p>
        <div className="modal-action">
        <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">{textoBoton}</button>
        </form>
        </div>
    </div>
    </dialog>
    </div>
  )
}

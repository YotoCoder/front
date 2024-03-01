import ModalNotify from "./components/modals/ModalNotify"


export default function Test() {
    return <>
        <ModalNotify
            titulo={'Bienvenido a Venezuela Master CUP!'}
            textoPrincipal={'Estamos trabajando en nuestra página web para habilitar el registro del próximo torneo, que comienza el 1ro de abril.'}
            textoSecundario={'Mantente alerta a las inscripciones para que puedas participar.'}
            textoBoton={'Cerrar'}
        >
        </ModalNotify>
    </>
}
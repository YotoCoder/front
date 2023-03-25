import { useState } from "react";
import ModalMMR from "./Modalmmr";
import styles from "./Modal.module.css";

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    // peticion patch endpoind  /mmrchampionship/update-jugador-by-user/5
    // mensaje success toast
    // cerrar modal y actualizar tabla
  };

  const [values, setValues] = useState({
    id_player: "1",
    mmr_actual: "5000",
    ganadas: "20",
    perdidas: "30",
  });

  return (
    <>
      <button className="text-white" onClick={handleOpenModal}>
        Open Modal
      </button>
      <ModalMMR isOpen={isOpen} onClose={handleCloseModal}>
        <h2 className={styles.tittle}>Actualizando puntuación</h2>

        <table className="w-[300px]">
          <tr className="flex pl-20 pt-8 items-center justify-between">
            <td className="text-white font-bold">
              <p className="text-white font-bold">MMR Actual</p>
            </td>
            <td className="text-white font-bold">
              <input
                className={styles.input}
                type="number"
                value={values.mmr_actual}
                onChange={(e) => {
                  setValues({ ...values, mmr_actual: e.target.value });
                }}
              ></input>
            </td>
          </tr>
          <tr className="flex pl-20 pt-6 items-center justify-between">
            <td className="text-white font-bold">
              <p className="text-white font-bold">Ganadas</p>
            </td>
            <td className="text-white font-bold">
              <input
                className={styles.input}
                type="number"
                value={values.ganadas}
                onChange={(e) => {
                  setValues({ ...values, ganadas: e.target.value });
                }}
              ></input>
            </td>
          </tr>

          <tr className="flex pl-20 pt-6 items-center justify-between">
            <td className="text-white font-bold">
              <p className="">Perdidas</p>
            </td>
            <td className="text-white font-bold pb-4">
              <input
                className={styles.input}
                type="number"
                value={values.perdidas}
                onChange={(e) => {
                  setValues({ ...values, perdidas: e.target.value });
                }}
              ></input>
            </td>
          </tr>
        </table>

        <div className="flex space-x-4 items-center justify-center p-4">
          <div
            className="flex items-center cursor-pointer hover:bg-[#CF142B] text-xl drop-shadow-sm rounded-2xl border-[6px] border-[#CF142B]  p-2 justify-center w-[140px] text-white "
            onClick={handleCloseModal}
          >
            Cancelar
          </div>
          <div
            className="flex items-center cursor-pointer hover:bg-[#2ED86B] text-xl drop-shadow-sm rounded-2xl border-[6px] border-[#2ED86B]  p-2 justify-center w-[140px] text-white "
            onClick={handleSave}
          >
            Guardar
          </div>
        </div>
      </ModalMMR>
    </>
  );
}

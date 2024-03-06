import { useState } from "react";
import ModalMMR from "./Modalmmr";
import styles from "./Modal.module.css";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import { useAtom } from "jotai";

import { dataJugadorModalAtom } from "../../../store";

import { modalIsOpenAtom } from "../../../store";

const API_URL = process.env.APIhost + "/mmrchampionship/";

const host = process.env.APIhost;

export default function MyModal() {
  const [isOpen, setIsOpen] = useAtom(modalIsOpenAtom);

  const router = useRouter();


  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const [values, setValues] = useAtom(dataJugadorModalAtom);

  const handleSave = (e, id_player) => {
    // peticion patch endpoind  /mmrchampionship/update-jugador-by-user/5

    let headersList = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    let bodyContent = values;

    let reqOptions = {
      url: `${host}/mmrchampionship/update-jugador-by-user/${values.jugador_id}`, // id_player
      method: "PATCH",
      headers: headersList,
      data: bodyContent,
    };

    e.preventDefault();
    axios(reqOptions)
      .then((res) => {
        toast.success("Puntuacion actualizada correctamente!");
        setTimeout(() => {
          router.reload();
        }, 200);
      })
      .catch((err) => {
        toast.error(
          "Hubo un problema por favor vuelve a intentarlo si el problema persiste comunicate con soporte.  " +
            err.response.data.message +
            " " +
            err.message
        );
      });

    // cerrar modal y actualizar tabla
  };

  return (
    <>
      <Toaster
        toastOptions={{
          loading: {
            duration: 5000,
          },

          success: {
            duration: 3000,
          },
          // black theme
          style: {
            background: "#403f3f",
            color: "#fff",
          },
        }}
      />

      {/* <button
        className="border-2 border-lime-400/60 text-white rounded-md px-2 py-1"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Editar
      </button> */}
      <ModalMMR isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className={styles.tittle}>Actualizando puntuación</h2>

        <table className="w-[300px]">
          <tr className="flex pl-20 pt-6 items-center justify-between">
            <td className="text-white font-bold">
              <p className="text-white font-bold">ID Amigo</p>
            </td>
            <td className="text-white font-bold">
              <input
                className={styles.inputIdAmigo}
                type="number"
                value={values.id_amigo}
                onChange={(e) => {
                  setValues((values) => {
                    return {...values, id_amigo: e.target.value}
                  })
                }}
              ></input>
            </td>
          </tr>

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

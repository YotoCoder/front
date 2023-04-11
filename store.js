import { atom } from "jotai";

export const menuAtom = atom(false);
export const sessionAtom = atom(null);
export const usernameSessionAtom = atom(null);
export const coroticoEdicionAtom = atom(null);
export const mmrChampionshipEdicionAtom = atom(null);

export const mmrModalAtom = atom(false);

export const modalIsOpenAtom = atom(false);

export const dataJugadorModalAtom = atom({
  id_player: 0,
  id_amigo: 0,
  mmr_actual: 0,
  ganadas: 0,
  perdidas: 0,
});

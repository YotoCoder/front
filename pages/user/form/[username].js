import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import Nav from "../../components/Nav";
import { toast, Toaster } from "react-hot-toast";
import Footer from "../../components/Footer";

const Userform = () => {
  const host = process.env.APIhost;
  const router = useRouter();
  const { username } = router.query;

  const [avatarChange, setAvatarChange] = useState(false);

  const [changeUsername, setChangeUsername] = useState(false);

  const [changeEmail, setChangeEmail] = useState(false);

  const [error, setError] = useState({});

  const [user, setUser] = useState({});

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (username != undefined) {
      axios.get(host + "/users/" + username).then((res) => {
        console.log(res.data);
        setUser(res.data);
        setImage(host + res.data.avatar);
      });
    }
  }, [username]);

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const headersList = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    const bodyContent = new FormData();
    bodyContent.append("username", user.username);
    bodyContent.append("first_name", user.first_name);
    bodyContent.append("last_name", user.last_name);
    bodyContent.append("biografia", user.biografia);

    bodyContent.append("roll", user.roll);
    bodyContent.append("pais", user.pais);
    bodyContent.append("discord", user.discord);
    bodyContent.append("steam_id", user.steam_id);
    bodyContent.append("id_amigo", user.id_amigo);

    if (changeEmail) {
      bodyContent.append("email", user.email);
    }

    if (avatarChange) {
      bodyContent.append("avatar", user.avatar);
    }

    let reqOptions = {
      url: host + "/users/update/",
      method: "PATCH",
      headers: headersList,
      data: bodyContent,
    };

    toast.promise(axios.request(reqOptions), {
      loading: "Cargando...",
      success: (data) => {
        if (changeUsername) {
          localStorage.setItem("username", user.username);
        }
        router.push("/user/profile/" + user.username);
        return <b>Actualizado con exito!</b>;
      },
      error: (err) => {
        setError(err.response.data);
        console.log(err);
        return (
          <p>
            Ocurrió un error, si el problema persiste comunicate con el area de
            soporte.
          </p>
        );
      },
    });

    //
  };

  return (
    <>
      <Nav />
      <Toaster
        toastOptions={{
          loading: {
            duration: 3000,
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
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-4 lg:w-96 rounded-xl bg-[#212326] p-4 px-2 relative top-10 justify-center items-center text-white">
          <h1 className="text-2xl">Editar perfil</h1>

          <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="avatar">
              Avatar (max 2mb)
            </label>

            {error && <div className="text-red-500">{error.avatar}</div>}
            <div className="">
              <img
                src={
                  user.avatar ? image : "https://vemastercup.com/icons/user.svg"
                }
                alt="avatar"
                id="img"
                className="w-44 h-44 p-2 rounded-full lg:block"
                style={{
                  background: "linear-gradient( #c59b37, #f4e078 )",
                }}
              />
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <input
              type="file"
              name="max"
              id="avatar"
              className=""
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              onChange={(e) => {
                setAvatarChange(true);
                setUser({ ...user, avatar: e.target.files[0] });
                if (e.target.files[0].size > 2000000) {
                  toast.error("El archivo es muy grande maximo 2mb");
                  return;
                }
                if (e.target.files[0]) {
                  setImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="first_name">
                Username
              </label>
              {error && <div className="text-red-500">{error.username}</div>}
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                  setChangeUsername(true);
                }}
              />

              <label className="font-bold" htmlFor="pais">
                País
              </label>
              {error && <div className="text-red-500">{error.pais}</div>}
              <select
                name="pais"
                id="pais"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.pais ? user.pais : "default"}
                onChange={(e) => {
                  setUser({ ...user, pais: e.target.value });
                }}
              >
                <option value="default">Selecciona un país</option>
                <option value="AR">Argentina</option>
                <option value="BO">Bolivia</option>
                <option value="BR">Brasil</option>
                <option value="CA">Canadá</option>
                <option value="CL">Chile</option>
                <option value="CO">Colombia</option>
                <option value="CR">Costa Rica</option>
                <option value="CU">Cuba</option>
                <option value="EC">Ecuador</option>
                <option value="SV">El Salvador</option>
                <option value="ES">España</option>
                <option value="US">Estados Unidos</option>
                <option value="GT">Guatemala</option>
                <option value="HN">Honduras</option>
                <option value="MX">México</option>
                <option value="NI">Nicaragua</option>
                <option value="PA">Panamá</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Perú</option>
                <option value="PR">Puerto Rico</option>
                <option value="DO">República Dominicana</option>
                <option value="UY">Uruguay</option>
                <option value="VE">Venezuela</option>
              </select>

              <label className="font-bold" htmlFor="first_name">
                Nombre
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.first_name}
                onChange={(e) => {
                  setUser({ ...user, first_name: e.target.value });
                }}
              />

              <label className="font-bold" htmlFor="last_name">
                Apellido
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.last_name}
                onChange={(e) => {
                  setUser({ ...user, last_name: e.target.value });
                }}
              />

              <label className="font-bold" htmlFor="email">
                Biografia
              </label>
              {error && <div className="text-red-500">{error.biografia}</div>}
              <textarea
                type="text-area"
                name="biografia"
                id="biografia"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.biografia}
                onChange={(e) => {
                  setUser({ ...user, biografia: e.target.value });
                }}
              />

              <label className="font-bold flex gap-2" htmlFor="discord">
                Discord{" "}
                <img
                  src="../../icons/discord2.svg"
                  alt="discord"
                  className="w-5"
                />
              </label>
              {error && <div className="text-red-500">{error.discord}</div>}
              <input
                type="text-area"
                name="discord"
                placeholder="usuario#1234"
                id="discord"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.discord}
                onChange={(e) => {
                  setUser({ ...user, discord: e.target.value });
                }}
              />

              <label className="font-bold flex gap-2" htmlFor="steam_id">
                steam id{" "}
                <img
                  src="../../icons/steam.svg"
                  alt="steam_id"
                  className="w-5"
                />
              </label>
              {error && <div className="text-red-500">{error.steam_id}</div>}
              <input
                type="text-area"
                name="steam_id"
                placeholder="https://steamcommunity.com/profiles/76561198061357779/"
                id="steam_id"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.steam_id}
                onChange={(e) => {
                  setUser({ ...user, steam_id: e.target.value });
                }}
              />

              <label className="font-bold flex gap-2" htmlFor="id_amigo">
                ID de amigo en Dota 2{" "}
              </label>
              {error && <div className="text-red-500">{error.id_amigo}</div>}
              <input
                type="text-area"
                name="id_amigo"
                placeholder="123456789"
                id="id_amigo"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.id_amigo}
                onChange={(e) => {
                  setUser({ ...user, id_amigo: e.target.value });
                }}
              />

              <label className="font-bold" htmlFor="email">
                Email (opcional){" "}
                <span className="text-xs">
                  *No te enviaremos spam es solo parar recuperar tu cuenta en
                  caso de perdida
                </span>
              </label>
              {error && <div className="text-red-500">{error.email}</div>}
              <input
                type="email"
                name="email"
                placeholder="usuario@gmail.com"
                id="email"
                className="bg-[#40444b] p-2 rounded-md"
                value={user.email}
                onChange={(e) => {
                  setChangeEmail(true);
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                className="outline outline-1 p-2 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/user/profile/" + username);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-[#2d7d46] p-2 rounded-md"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Userform;

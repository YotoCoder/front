import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "./components/Cargador";
import Select from "react-select";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Nav = dynamic(() => import("./components/Nav"), {
  suspense: true,
});

const Head = dynamic(() => import("next/head"), {
  suspense: true,
});

const Footer = dynamic(() => import("./components/Footer"), {
  suspense: true,
});

const Titulo = dynamic(() => import("./components/Titulo"), {
  suspense: true,
});

const RegistroTorneo = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [nombre, setNombre] = useState("");
  const [tag, setTag] = useState("");
  const [jugadores, setJugadores] = useState([]);
  const [options, setOptions] = useState([]);
  const [rules, setRules] = useState(false);

  const [error, setError] = useState({});

  const host = process.env.APIhost;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!rules) {
      toast.error("Debes aceptar las reglas!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("nombre", nombre);
    formData.append("tag", tag);
    jugadores.forEach((jugador) => {
      formData.append("jugadores", jugador.value);
    });

    toast.promise(
      axios.post(host + "/torneo/equipo/", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "aplication/json",
        },
      }),
      {
        loading: "Registrando equipo...",
        success: (res) => {
          router.push("/torneo-clasificatorio-iesf-wec-2024");
          return "Equipo registrado con éxito.";
        },
        error: (err) => {
          setError(err.response.data);
          console.log(err.response.data);
          if (err.response.status == 401) {
            return "Debes iniciar sesión para poder inscribir a tu equipo.";
          }
          return "Error al registrar equipo.";
        },
      }
    );
  };

  useEffect(() => {
    axios.get(host + "/users/").then((res) => {
      // Filtrar el primer registro (administrador)
      const filteredOptions = res.data.filter(
        (user) => user.username !== "administrador"
      ); // Reemplaza "admin" con el nombre del administrador

      // Mapear y establecer las opciones filtradas en el estado
      setOptions(
        filteredOptions.map((user) => ({
          value: user.id,
          label: user.username,
        }))
      );
    });
  }, []);

  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>VMC | Torneo Dota 2 IESF WEC 2024</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Torneo de Dota 2 Venezuela Master CUP 2024 | Registro de equipos"
          key="title"
        />
        <meta
          name="description"
          content="Registro de torneo online Dota 2 VMC Venezuela Master Cup."
          key="desc"
        />
        <meta property="og:image" content="../images/flyer-vmc-2024.jpg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="../images/escudo.png" />
      </Head>
      <div>
        <Toaster />
        <div className="sticky top-0 z-50 w-full">
          <Nav />
        </div>
        <h1
          className="nombreCard !font-extrabold lg:mb-2 flex flex-col items-center justify-center text-3xl lg:text-4xl lg:p-2"
          style={{
            background:
              "linear-gradient(90deg, #F6B52E, #F6B52E, #F6B52E, #F6B52E)",

            color: "#EFEFEF",
            textShadow: "1px 0px 1px #000000",
          }}
        >
          <b className="lg:ml-0">Regístrate en el Torneo</b>
          <i
            className="text-black text-base !font-extrabold lg:text-3xl lg:p-2"
            style={{
              textShadow: "none",
            }}
          >
            Campeonato Nacional Clasificatorio<br></br> IESF WEC 2024
          </i>
        </h1>

        <p className="text-center font-bold text-black bg-backgroundLayer bg-center bg-contain bg-no-repeat p-10 mt-2 mx-4">
          Ingresa los datos de tu equipo.
        </p>

        <form className="flex items-center justify-center pt-4 flex-col gap-2">
          {error.avatar && <p className="text-red-500">{error.avatar}</p>}
          <label className="input input-bordered py-12 lg:p-0 flex items-center gap-2 w-3/4 lg:w-96 lg:pl-4 ">
            Logo del Equipo
            <input
              type="file"
              className="grow"
              onChange={(e) => setAvatar(e.target.files[0])}
              accept="image/*"
            />
          </label>
          <img
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : "https://via.placeholder.com/150"
            }
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          {error.nombre && <p className="text-red-500">{error.nombre}</p>}
          <label className="input input-bordered flex py-12 lg:p-0 items-center gap-2 w-3/4 lg:w-96 lg:pl-4  ">
            Nombre del Team
            <input
              type="text"
              className="grow"
              placeholder="Venezuela Master CUP"
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>

          {error.tag && <p className="text-red-500">{error.tag}</p>}
          <label className="input input-bordered flex items-center gap-2 w-3/4 lg:w-96 lg:pl-4 py-8 lg:p-0">
            Tag (Abreviación)
            <input
              type="text"
              className="grow"
              placeholder="VMC"
              onChange={(e) => setTag(e.target.value)}
            />
          </label>

          <label className="text-white pl-8 lg:pl-0">
            Jugadores del Equipo (Deben estar Registrados)
            {error.jugadores && (
              <p className="text-red-500">{error.jugadores}</p>
            )}
          </label>
          <Select
            required
            options={options}
            isMulti
            className="basic-multi-select w-3/4 lg:w-96"
            classNamePrefix="select"
            onChange={(e) => setJugadores(e)}
          />
          <div className="flex gap-2  w-3/4"></div>
          <div className="flex gap-2 ml-12">
            <input
              type="checkbox"
              onChange={(e) => setRules(e.target.checked)}
            />
            <p className="text-white">
              Acepto haber leido y aceptado todas las{" "}
              <a
                href={"/torneo-clasificatorio-iesf-wec-2024#reglas"}
                target="_blank"
                className="text-[#F6B52E] "
              >
                reglas
              </a>{" "}
              del torneo.
            </p>
          </div>
          <button
            className="btn border-[#F6B52E] bg-[#F6B52E] w-3/4 lg:w-96 lg:pl-4  text-white"
            onClick={onSubmit}
          >
            Inscribir Equipo
          </button>
        </form>
      </div>
      <Footer />
    </Suspense>
  );
};

export default RegistroTorneo;

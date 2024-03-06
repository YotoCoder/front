import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "./components/Cargador";
import Select from "react-select";
import axios from "axios";


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
  const [avatar, setAvatar] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [tag, setTag] = useState(null);
  const [jugadores, setJugadores] = useState(null);
	const [options, setOptions] = useState([]);

	const host = process.env.APIhost;

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
		formData.append("avatar", avatar);
		formData.append("nombre", nombre);
		formData.append("tag", tag);
		formData.append("jugadores", 
			jugadores.map((jugador) => jugador.value.toString())
		);
		
		console.log(formData.get('jugadores'));
	
		axios
			.post(host + "/torneo/equipo/", formData, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
					// "Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res.response.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
  };

  useEffect(() => {
    axios.get(host + "/users/").then((res) => {
      setOptions( res.data.map((user) => ({
				value: user.id,
				label: user.username,
			})));
    });
  }, []);

  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>VMC | Torneo Dota 2 2024</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Venezuela Master CUP DOTA 2 | Registro Torneo 2024"
          key="title"
        />
        <meta
          name="description"
          content="Registro de torneo online Dota 2 Venezuela."
          key="desc"
        />
        <meta property="og:image" content="../images/escudo.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="../images/escudo.png" />
      </Head>
      <div>
        <div className="sticky top-0 z-50 w-full">
          <Nav />
        </div>
        <Titulo
          primary={"Registrate en el torneo"}
          secondary={"VMC edición 2024."}
        />
        <p className="text-center text-white">
          Ingresa los datos de tu equipo.
        </p>
        <div className="flex items-center justify-center">
          <form className="flex items-center justify-center pt-4 flex-col gap-2 px-8">
            <label className="input input-bordered flex items-center gap-2 w-full">
              Avatar
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

            <label className="input input-bordered flex items-center gap-2 w-full ">
              Nombre
              <input
                type="text"
                className="grow"
                placeholder="Venezuela Master CUP"
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 w-full">
              Tag
              <input
                type="text"
                className="grow"
                placeholder="VMC"
                onChange={(e) => setTag(e.target.value)}
              />
            </label>
            <label className="text-white">
              Jugadores del Equipo (Registrados)
            </label>
            <Select
              options={options}
              isMulti
              className="basic-multi-select w-full"
              classNamePrefix="select"
              onChange={(e) => setJugadores(e)}
            />

            <button className="btn bg-[#FAF597] w-full" onClick={onSubmit}>
              Registrar
            </button>
          </form>
        </div>
        <Footer />
      </div>
      <Footer />
    </Suspense>
  );
};

export default RegistroTorneo;

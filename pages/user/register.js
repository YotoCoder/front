import Link from "next/link";
import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import axios from "axios";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [rol, setRol] = useState("");
  

  const [error, setError] = useState({});

  const host = process.env.APIhost;
  const API_URL = host + "/users/register/";
  const API_LOGIN = host + "/token/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(axios.post(API_URL, { username, password, rol }), {
      loading: "Cargando...",

      success: (data) => {
        // console.log(data)
        axios.post(API_LOGIN, { username, password }).then((res) => {
          localStorage.setItem("token", res.data.access);
          localStorage.setItem("username", username);
          router.push("/");
        });
        return <b>Bienvenido {username}!</b>;
      },
      error: (err) => {
        setError(err.response.data);
        return <b>Hubo un problema verifica tus datos de registro! Si persiste el problema comunicate con alguien del staff VMC.</b>;
        },
    });
  };

  useEffect(() => {
    // verificar contraseñas iguales
    if (password !== password2) {
      setError({ password2: "Las contraseñas no coinciden" });
    } else {
      setError({ password2: "" });
    }
  }, [password, password2]);

  return (
    <>
      <Nav />
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
      <div className="lg:flex lg:pt-20 items-center justify-center">
        <div className="flex items-center justify-center">
          <img
            src="../images/escudo.png"
            alt="logo"
            className="lg:h-[50vh] object-cover h-[20vh] lg:block"
          />
        </div>
        <div className="">
          <section className="max-w-xl items-center justify-center p-6 mx-2 bg-[#242424] rounded-md shadow-2xl shadow-[#39C500]  mt-0 lg:mt-5">
            <h1 className="text-xl font-semibold capitalize text-white">
              Registrate en VMC
            </h1>

            <form>
              <div className="grid grid-cols-1 gap-6 mt-4">
                <div>
                  <p className="text-red-500">{error.username}</p>
                  <label className="text-white" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-4 py-2 mt-2  bg-[#403f3f] border  rounded-md  text-white border-gray-600  focus:border-gray-500 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <p className="text-red-500">{error.rol}</p>
                  <label className="text-white" htmlFor="rol">
                    Rol
                  </label>
                  <select
                    id="rol"
                    className="block w-full px-4 py-2 mt-2  border  rounded-md bg-[#403f3f] text-white border-gray-600 focus:border-gray-500 focus:outline-none focus:ring"
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="Carry">Carry</option>
                    <option value="Mid">Mid</option>
                    <option value="Off Laner">Off Lane</option>
                    <option value="Soft Support">Soft Support</option>
                    <option value="Hard Support">Hard Support</option>
                  </select>
                </div>

                <div>
                  <p className="text-red-500">{error.password}</p>
                  <label className="text-white" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2  border  rounded-md bg-[#403f3f] text-white border-gray-600 focus:border-gray-500 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <p className="text-red-500">{error.password2}</p>
                  <label className="text-white" htmlFor="passwordConfirmation">
                    Confirmar Contraseña
                  </label>

                  <input
                    id="password2"
                    type="password"
                    onChange={(e) => setPassword2(e.target.value)}
                    className="block w-full px-4 py-2 mt-2  border  rounded-md bg-[#403f3f] text-white border-gray-600 focus:border-gray-500 focus:outline-none focus:ring"
                  />
                </div>
              </div>

              <div className="flex justify-start gap-2 mt-6">
                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform hover:bg-lime-700 rounded-2xl bg-black focus:outline-none focus:bg-gray-600"
                        onClick={handleSubmit}
                >
                  Registrarse
                </button>
                <Link
                  href="/"
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-2xl hover:bg-red-700 focus:outline-none focus:bg-gray-600"
                >
                  Cancelar
                </Link>
              </div>
              <div className="pt-4 flex gap-4">
                <p className="text-white">Ya tienes cuenta?</p>
                <Link href="/user/login" className="text-lime-500">
                  Iniciar Sesión
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

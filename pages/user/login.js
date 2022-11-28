import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import axios from "axios";
import { useRouter } from "next/router";

import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const router = useRouter();

  const host = process.env.APIhost;
  const API_URL = host + "/token/";

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(axios.post(API_URL, { username, password }), {
      loading: "Cargando...",

      success: (data) => {
        // console.log(data)
        localStorage.setItem("token", data.data.access);
        localStorage.setItem("username", username);
        router.push("/");
        return <b>Bienvenido {username}!</b>;
      },
      error: <b>Ups! al parecer hubo un error.</b>,
    });
  };

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
            className="lg:h-[50vh] object-cover h-[20vh] lg:block "
          />
        </div>
        <div className="">
          <section className="max-w-xl items-center justify-center p-6 mx-2 bg-[#242424] rounded-md shadow-2xl shadow-[#e7cd66]  mt-0 lg:mt-5">
            <h1 className="text-xl font-bold capitalize text-white">
              Iniciar Sesion
            </h1>

            <form>
              <div className="grid grid-cols-1 gap-6 mt-4">
                <div>
                  <label className="text-white" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    className="block w-full px-4 py-2 mt-2  bg-[#403f3f] border  rounded-md  text-gray-300 border-gray-600  focus:border-gray-500 focus:outline-none focus:ring"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-white" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="block w-full px-4 py-2 mt-2  border  rounded-md bg-[#403f3f] text-gray-300 border-gray-600 focus:border-gray-500 focus:outline-none focus:ring"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-start gap-2 mt-6">
                <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform hover:bg-yellow-700 rounded-2xl bg-black focus:outline-none focus:bg-gray-600"
                        onClick={handleSubmit}
                >
                  Entrar
                </button>
                <Link
                  href="/"
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-2xl hover:bg-red-700 focus:outline-none focus:bg-gray-600"
                >
                  Cancelar
                </Link>
              </div>
              <div className="pt-4 flex gap-4">
                <p className="text-white">No estás registrado?</p>
                <Link href="/user/register" className="text-yellow-500">
                  Registrate
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

export default Login;

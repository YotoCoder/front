import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

import { toast, Toaster } from 'react-hot-toast';

const Logout = () => {

  const router = useRouter();
  // cerrando sesion con loader
  useEffect(() => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        loading: 'Cerrando sesión...',
        success: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          router.push('/');
          return <b>¡Sesión finalizada!</b>;
        },
        error: <b>Ups! al parecer hubo un error.</b>,
      }
    );
  }, []);
 
  return (
    <Toaster />

  )
}

export default Logout
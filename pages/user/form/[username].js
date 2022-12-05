import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Formik } from 'formik';

const Userform = () => {
  const host = process.env.APIhost;

  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (username != undefined) {
      axios.get(host + "/users/" + username).then((res) => {
        console.log(res.data);
      });
    }
  }, [username]);

  return (
    <div>
      as
    </div>
  );
};

export default Userform;
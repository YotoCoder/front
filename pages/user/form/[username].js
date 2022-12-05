import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Formik } from 'formik';

const Userform = () => {

  const host = process.env.APIhost;
  const router = useRouter();
  const { username } = router.query;

  const [user, setUser] = useState({});

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (username != undefined) {
      axios.get(host + "/users/" + username).then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    }
  }, [username]);


  useEffect(() => {

   
     
  }, []);
  
  const handleSubmit = (values) => {
    const headersList = {
      "Authorization": `Bearer ` + localStorage.getItem("token")
    }
     
     const bodyContent = new FormData();
     bodyContent.append("first_name", "Yonathan");
     bodyContent.append("last_name", "Soto");
     bodyContent.append("avatar", user.avatar);
     
     fetch("http://localhost:8000/users/update/", { 
       method: "PATCH",
       body: bodyContent,
       headers: headersList
     }).then(response => response.json())
       .then(data => console.log(data))
       .catch(error => console.log(error));

    // go to profile page
    router.push("/user/profile/" + username);
  }

  return (
    <div className="text-white">
      <input type="file" name="avatar" id="avatar"
             
             onChange={(e) => {
              user.avatar = e.target.files[0]
             }}
      />
      <button className="bg-yellow-500 p-2 rounded-md"
              onClick={() => {
                handleSubmit();
              }}
      >Enviar</button>

    </div>
  );
};

export default Userform;
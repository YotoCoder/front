import { useState } from "react";

const Titulo = (props) => {
  const primary = props.primary;
  const secondary = props.secondary;

  return (
    <>
      <h1
        className="nombreCard lg:mb-2 flex flex-col items-center justify-center text-3xl lg:text-4xl lg:p-2"
        style={{
          background:
            "linear-gradient(90deg, #76C100, #76C200, #76C200, #76C200)",

          color: "#EFEFEF",
          textShadow: "1px 0px 1px #000000",
        }}
      >
        <b>{primary}</b>
        <i
          className="text-black text-base lg:text-3xl lg:p-2"
          style={{
            textShadow: "none",
          }}
        >
          {secondary}
        </i>
      </h1>
    </>
  );
};

export default Titulo;

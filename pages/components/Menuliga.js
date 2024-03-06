import { forwardRef, useEffect } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";

import axios from "axios";
import { useState } from "react";

import { useAtom } from "jotai";
import { coroticoEdicionAtom } from "../../store";

const MyLink = forwardRef((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href} legacyBehavior>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

function Menuliga() {
  const router = useRouter();
  const [ligas, setLigas] = useState([]);

  const edicion = useAtom(coroticoEdicionAtom);

  const host = process.env.APIhost;

  useEffect(() => {
    axios.get(host + "/liga/").then((res) => {
      setLigas(res.data);
    });
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <Menu.Button
        className={`${
          router.pathname == "/torneos" || router.pathname == "/shuffle"
            ? "border-b-[2px] "
            : ""
        } hover:bg-lime-700 text-white px-3 py-2  text-sm font-medium flex items-center  gap-2
          bg-lime-600 rounded-md
        `}
      >
        {
          edicion[0] != null
            ? edicion[0].nombre
            : "Edición"

        }
        <img src="https://vemastercup.com/icons/down.svg" className="w-4 h-4" />
      </Menu.Button>
      <Menu.Items>
        <Menu.Item>
          <div
            className="flex flex-col bg-black absolute my-4 top-8 z-[-1]"
            style={{
              borderRadius: "6px",
            }}
          >
            {ligas.map((liga, id) => (
              <MyLink
                key={id}
                href={`/liga/${liga.id}`}
                className="hover:bg-lime-700 text-white px-6 py-2  text-sm font-medium w-max"
                onClick={() => {
                  edicion[1](liga);
                }}
              >
                {liga.nombre}
              </MyLink>
            ))}
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default Menuliga;

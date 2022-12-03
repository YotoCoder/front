import { forwardRef } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";

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

function Menudrop() {
  const router = useRouter();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`${
          (router.pathname == "/torneos") || (router.pathname == "/shuffle")
            ? "border-b-[2px] border-select" 
            : ""
        } hover:bg-yellow-700 text-white px-3 py-2  text-sm font-medium flex items-center  gap-2`}
      >
        Torneos <img src="https://vemastercup.com/icons/down.svg" className="w-4 h-4" />
      </Menu.Button>
      <Menu.Items>
        <Menu.Item>
          <div
            className="flex flex-col bg-black absolute my-4 top-8 z-[-1]"
            style={{
              borderRadius: "6px",
            }}
          >
            <MyLink
              href="/torneo"
              className="hover:bg-yellow-700 text-white px-3 py-2  text-sm font-medium w-max"
            >
              Master CUP 2022 | Fin de año
            </MyLink>
            <MyLink
              href="#"
              className="hover:bg-yellow-700 text-white px-3 py-2  text-sm font-medium"
            >
              Master CUP 2023 | Primavera
            </MyLink>
            
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default Menudrop;

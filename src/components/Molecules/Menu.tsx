import { useContext, useRef } from "react";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";

const Menu = () => {
  const { signOut } = useContext(UserContext);

  const actions = useRef([
    {
      title: "Inicio",
      href: "/",
      dataCy: "nav-home",
    },
    {
      title: "Mi perfil",
      href: "/perfil",
      dataCy: "nav-profile",
    },
  ]);

  return (
    <nav
      data-cy="menu"
      className="absolute z-10 left-0 top-14 lg:top-10 lg:-left-10 flex flex-col text-sm bg-white border border-gray-100 rounded-lg shadow-md w-screen lg:w-32"
    >
      {actions.current.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="text-gray-400 hover:text-red-600 w-full py-3 px-4 text-left"
          data-cy={item.dataCy}
        >
          {item.title}
        </Link>
      ))}
      <button
        data-cy="btn-signout"
        className="text-gray-400 hover:text-red-600 w-full py-3 px-4 text-left"
        onClick={signOut}
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Menu;


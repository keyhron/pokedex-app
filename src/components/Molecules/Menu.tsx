import { useContext, useRef } from "react";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";

const Menu = () => {
  const { signOut } = useContext(UserContext);

  const actions = useRef([
    {
      title: "Inicio",
      href: "/",
    },
    {
      title: "Mi perfil",
      href: "/perfil",
    },
  ]);

  return (
    <nav className="absolute z-10 top-10 -left-10 flex flex-col text-sm bg-white border border-gray-100 rounded-lg shadow-md w-32">
      {actions.current.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="text-gray-400 hover:text-red-600 w-full py-3 px-4 text-left"
        >
          {item.title}
        </Link>
      ))}
      <button
        className="text-gray-400 hover:text-red-600 w-full py-3 px-4 text-left"
        onClick={signOut}
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Menu;


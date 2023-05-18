import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "../Molecules/Menu";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="w-full bg-red-600 relative">
      <div className="flex justify-between px-5 w-full h-14 items-center max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto">
        <Link
          className="text-sm lg:text-md p-2 text-white flex items-center"
          href="/"
        >
          <span>Pokedex App</span>
          <span className="ml-2">
            <Image
              src="/svgs/pokedex.svg"
              alt="Pokedex icon"
              width={16}
              height={16}
            />
          </span>
        </Link>
        <div className="lg:relative">
          <button
            className="rounded-full bg-red-500 p-2 hover:bg-red-700 transition-colors"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Image
              src="/svgs/menu.svg"
              alt="Pokedex icon"
              width={16}
              height={16}
            />
          </button>
          {openMenu && <Menu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


import Image from "next/image";
import Link from "next/link";

const Navbar = () => (
  <nav className="w-full bg-red-600">
    <div className="flex justify-between px-5 w-full h-14 items-center max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto relative">
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
      <button className="text-sm lg:text-md text-white mr-3">
        Cerrar sesión
      </button>
    </div>
  </nav>
);

export default Navbar;


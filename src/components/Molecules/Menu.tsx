const Menu = () => {
  return (
    <nav className="absolute z-10 top-10 -left-10 flex flex-col text-sm bg-white border border-gray-100 rounded-lg shadow-md w-32">
      <a
        href="#"
        className="text-gray-400 hover:text-red-600 w-full py-3 px-4 text-left"
      >
        Mi perfil
      </a>

      <a
        href="#"
        className="text-gray-400 hover:text-red-600 w-full py-3 px-4 text-left"
      >
        Cerrar sesión
      </a>
    </nav>
  );
};

export default Menu;


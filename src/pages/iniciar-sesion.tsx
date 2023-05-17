import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <main className="flex h-screen">
      <div className="w-2/5 flex justify-center items-center">
        <form className="w-full px-20" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
          <div className="mb-4">
            <input
              className="w-full border border-gray-400 p-2 rounded outline-none"
              placeholder="Correo electrónico"
              type="text"
              id="username"
              name="username"
            />
          </div>
          <div className="relative mb-10">
            <input
              className="w-full border border-gray-400 p-2 rounded outline-none"
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-0 top-0 bottom-0 px-4 flex items-center text-gray-500"
            >
              <Image
                src={showPassword ? "/svgs/eye.svg" : "/svgs/eye-off.svg"}
                alt={showPassword ? "Eye icon" : "Eye off icon"}
                width={20}
                height={20}
              />
            </button>
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-6 rounded"
          >
            Entrar
          </button>
        </form>
      </div>
      <div className="w-3/5 bg-cover bg-center bg-no-repeat bg-pokedex" />
    </main>
  );
};

export default Login;


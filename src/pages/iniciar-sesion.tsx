import { ChangeEvent, useContext, useState } from "react";
import Image from "next/image";
import Title from "@/components/Atoms/Title";
import Button from "@/components/Atoms/Button";
import { UserContext } from "@/contexts/UserContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const { signIn } = useContext(UserContext);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email, password });
  };

  return (
    <main className="flex h-screen">
      <div className="w-2/5 flex justify-center items-center">
        <form className="w-full px-20" onSubmit={handleSubmit}>
          <Title>Iniciar Sesión</Title>
          <div className="mb-4">
            <input
              className="w-full border border-gray-400 p-2 rounded outline-none"
              placeholder="Correo electrónico"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-10">
            <input
              className="w-full border border-gray-400 p-2 rounded outline-none"
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
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
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-6 rounded"
          >
            Entrar
          </Button>
        </form>
      </div>
      <div className="w-3/5 bg-cover bg-center bg-no-repeat bg-pokedex" />
    </main>
  );
};

export default Login;


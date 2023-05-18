import Link from "next/link";
import { useContext } from "react";
import Container from "@/components/Atoms/Container";
import Title from "@/components/Atoms/Title";
import Navbar from "@/components/Organisms/Navbar";
import { UserContext } from "@/contexts/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <Container className="my-10">
        <Link href="/" className="text-xs text-gray-500 underline">
          Volver al inicio
        </Link>

        <Title className="mt-2">Mi perfil</Title>

        <div>
          <h2>
            <span className="font-bold">Usuario:</span> {user?.first_name}{" "}
            {user?.last_name}
          </h2>
          <h2>
            <span className="font-bold">Correo electrónico:</span> {user?.email}
          </h2>
        </div>
      </Container>
    </div>
  );
}


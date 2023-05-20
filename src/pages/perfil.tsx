import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import PageLayout from "@/components/Templates/PageLayout";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <PageLayout title="Mi perfil" linkTitle="Ir al inicio">
      <div>
        <h2 data-cy="user-fullname">
          <b>Usuario:</b> {user?.first_name} {user?.last_name}
        </h2>
        <h2 data-cy="user-email">
          <b>Correo electrónico:</b> {user?.email}
        </h2>
      </div>
    </PageLayout>
  );
}


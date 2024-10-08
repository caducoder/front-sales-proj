import { Title } from "@mantine/core";
import React from "react";

import { useAuth } from "../../hooks/useAuth";

function AccountPage() {
  const { user } = useAuth();
  return (
    <div>
      <Title mb={16}>User Account</Title>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>
        Registrado desde:{" "}
        {new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(user.created_at))}
      </p>
    </div>
  );
}

export default AccountPage;

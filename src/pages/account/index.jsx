import { Box, Title } from "@mantine/core";
import React from "react";

import { useAuth } from "../../hooks/useAuth";
import UsersPage from "./users";

function AccountPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div>
      <Box></Box>
      <Title mb={16}>User Account</Title>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Setor: {user?.module?.name || "-"}</p>
      <p>
        Registrado desde:{" "}
        {new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(user?.created_at))}
      </p>
      {isAdmin && <UsersPage />}
    </div>
  );
}

export default AccountPage;

import { Center, Title } from "@mantine/core";
import React from "react";

function UnauthorizedPage() {
  return (
    <Center>
      <Title>Você não tem permissão para acessar esta página.</Title>
    </Center>
  );
}

export default UnauthorizedPage;

import { Button, Title } from "@mantine/core";
import React from "react";

function HomePage() {
  return (
    <div>
      <Title order={1}>Vite + React</Title>
      <div>
        <p>Welcome to the E-commerce Admin Panel!</p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
      <Button color="green">Entrar</Button>
    </div>
  );
}

export default HomePage;

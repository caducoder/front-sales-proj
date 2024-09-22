import {
  Button,
  Title,
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  rem,
} from "@mantine/core";
import React from "react";
import { ActionsGrid } from "../../components/actionsGrid";
import { StatsGroup } from "../../components/statsGroup";
import { ProgressCardColored } from "../../components/progressCard";

const PRIMARY_COL_HEIGHT = rem(300);

function HomePage() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <>
      <div>
        <Title order={1}>Vite + React</Title>
        <div>
          <p>Welcome to the E-commerce Admin Panel!</p>
        </div>
      </div>
      {/* <Container my="md" style={{ border: "1px solid red" }}> */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt={16}>
        <ActionsGrid />
        <Grid gutter="md">
          <Grid.Col>
            <StatsGroup />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ProgressCardColored />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      {/* </Container> */}
    </>
  );
}

export default HomePage;

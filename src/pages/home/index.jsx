import {
  Button,
  Title,
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  rem,
  Box,
  Tabs,
} from "@mantine/core";
import React from "react";
import { ActionsGrid } from "../../components/actionsGrid";
import { StatsGroup } from "../../components/statsGroup";
import { ProgressCardColored } from "../../components/progressCard";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import DashboardPage from "./dashboard";
import AnalyticsPage from "./analytics";

const PRIMARY_COL_HEIGHT = rem(300);

function HomePage() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const navigate = useNavigate();
  const { segment } = useParams();

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
      <Box>
        <Tabs
          value={segment}
          defaultValue={"dashboard"}
          onChange={(value) => navigate(`/app/home/${value}`)}
        >
          <Tabs.List>
            <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
            <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="dashboard" pt="xs">
            <DashboardPage />
          </Tabs.Panel>
          <Tabs.Panel value="analytics" pt="xs">
            <AnalyticsPage />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
}

export default HomePage;

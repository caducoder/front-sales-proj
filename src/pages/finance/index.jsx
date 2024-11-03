import React from "react";
import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  rem,
  Container,
  Grid,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { withAuth } from "../../hocs/withAuth";
import { UsersStack } from "./UsersRate";
import { TaskCard } from "./TaskCard";
import { ArticleCardVertical } from "./VerticalArticle";
import { useHasModule } from "../../hooks/useHas";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const data = [
  {
    label: "Page views",
    stats: "456,578",
    progress: 65,
    color: "teal",
    icon: "up",
  },
  {
    label: "New users",
    stats: "2,550",
    progress: 72,
    color: "blue",
    icon: "up",
  },
  {
    label: "Orders",
    stats: "4,735",
    progress: 52,
    color: "red",
    icon: "down",
  },
];

function FinancePage() {
  const userHasModule = useHasModule(2);
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          {userHasModule && (
            <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 8 }}>
          <UsersStack />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TaskCard />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <ArticleCardVertical />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <ArticleCardVertical />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <ArticleCardVertical />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default withAuth(FinancePage, {
  allowedRoles: ["coordinator", "collaborator"],
  allowedModules: [2, 4],
});

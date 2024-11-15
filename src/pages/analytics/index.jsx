import React from "react";
import { Box, Group, Paper, SimpleGrid, Tabs, Text } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./StatsGrid.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ProductsPage from "./products";
import OrdersPage from "./orders";
import { useHasModule } from "../../hooks/useHas";
import { withAuth } from "../../hocs/withAuth";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: "Revenue", icon: "receipt", value: "13,456", diff: 34 },
  { title: "Profit", icon: "coin", value: "4,145", diff: -13 },
  { title: "Coupons usage", icon: "discount", value: "745", diff: 18 },
  { title: "New customers", icon: "user", value: "188", diff: -30 },
];

function AnalyticsHomepage() {
  const navigate = useNavigate();
  const { segment } = useParams();
  const hasFinanceAccess = useHasModule(2);

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <>
      <div className={classes.root}>
        {hasFinanceAccess && (
          <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
        )}
      </div>
      <Box>
        <Tabs
          value={segment}
          defaultValue={"products"}
          onChange={(value) => navigate(`/app/analytics/${value}`)}
        >
          <Tabs.List>
            <Tabs.Tab value="products">Products</Tabs.Tab>
            <Tabs.Tab value="orders">Orders</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="products" pt="xs">
            <ProductsPage />
          </Tabs.Panel>
          <Tabs.Panel value="orders" pt="xs">
            <OrdersPage />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
}

export default withAuth(AnalyticsHomepage, {
  allowedRoles: ["coordinator", "collaborator"],
  allowedModules: [4],
});

import { ActionIcon, Box, Title } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getOrders } from "../../../api/Orders";
import OrdersTable from "./_components/OrdersTable";

const columnsDef = [
  {
    header: "Customer",
    columns: [
      {
        header: "Name",
        accessorKey: "customer.name",
      },
      {
        header: "Email",
        accessorKey: "customer.email",
      },
    ],
  },
  {
    header: "Info",
    columns: [
      {
        header: "Created At",
        accessorKey: "created_at",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Total",
        accessorKey: "totalValue",
        cell: ({ cell, row }) => {
          const valueBRL = new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "BRL",
          }).format(Number(cell.getValue()) / 100);
          return `${valueBRL}`;
        },
      },
    ],
  },
];

function OrdersPage() {
  const { isPending, data, refetch, isRefetching } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Title>Orders</Title>
        <ActionIcon
          variant="subtle"
          color="teal"
          onClick={() => refetch()}
          loading={isRefetching}
        >
          <IconRefresh size={18} />
        </ActionIcon>
      </Box>
      <OrdersTable dataList={data} columns={columnsDef} />
    </div>
  );
}

export default OrdersPage;

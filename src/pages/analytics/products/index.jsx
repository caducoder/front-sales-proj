import { ActionIcon, Box, Button, Group, Title } from "@mantine/core";
import { IconDotsVertical, IconPlus, IconRefresh } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getProducts } from "../../../api/Products";
import IndeterminateCheckbox from "./_components/IndeterminateCheckbox";
import ProductTable from "./_components/ProductTable";

const columnsDef = [
  {
    id: "selection",
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox
    header: ({ table }) => (
      <div>
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ cell, row }) => {
      const valueBRL = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "BRL",
      }).format(Number(cell.getValue()) / 100);
      return `${valueBRL}`;
    },
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    id: "Actions",
    header: "Ação",
    cell: ({ row }) => (
      <ActionIcon
        variant="subtle"
        color="dark"
        onClick={() => alert(JSON.stringify(row.original))}
      >
        <IconDotsVertical />
      </ActionIcon>
    ),
  },
];

function ProductsPage() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
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
        <Title>Products</Title>
        <Group>
          <ActionIcon
            variant="subtle"
            color="teal"
            onClick={() => refetch()}
            loading={isPending}
          >
            <IconRefresh />
          </ActionIcon>
          <Button variant="filled" color="teal" leftSection={<IconPlus />}>
            Adicionar
          </Button>
        </Group>
      </Box>
      <ProductTable dataList={data} columns={columnsDef} />
    </div>
  );
}

export default ProductsPage;

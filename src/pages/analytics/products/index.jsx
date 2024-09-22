import { ActionIcon, Box, Button, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconPlus,
  IconRefresh,
  IconTrashFilled,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getProducts } from "../../../api/Products";
import AddProduct from "./_components/AddProduct";
import IndeterminateCheckbox from "./_components/IndeterminateCheckbox";
import ProductTable from "./_components/ProductTable";

const columnsDef = [
  {
    id: "delete",
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox
    header: () => null,
    cell: ({ row }) => (
      <ActionIcon
        variant="subtle"
        color="red"
        onClick={() => alert(row.original.id)}
      >
        <IconTrashFilled />
      </ActionIcon>
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
  const [opened, { open, close }] = useDisclosure(false);
  const { isPending, data, refetch, isRefetching } = useQuery({
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
            loading={isRefetching}
          >
            <IconRefresh size={18} />
          </ActionIcon>
          <Button
            variant="filled"
            color="teal"
            leftSection={<IconPlus />}
            onClick={open}
          >
            Adicionar
          </Button>
        </Group>
      </Box>
      <Modal opened={opened} onClose={close} title="Register Product">
        <AddProduct closeModal={close} />
      </Modal>
      <ProductTable dataList={data} columns={columnsDef} />
    </div>
  );
}

export default ProductsPage;

import {
  Box,
  Button,
  List,
  rem,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconUserHeart } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getClients } from "../../../api/Clients";

function ClientsPage() {
  const { data, isPending } = useQuery({
    queryKey: ["customers"],
    queryFn: getClients,
  });
  return (
    <div>
      <Title mb={16}>Customers</Title>
      {isPending ? (
        <span>Loading...</span>
      ) : (
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconUserHeart size={rem(16)} stroke={1.5} />
            </ThemeIcon>
          }
        >
          {data?.map((customer) => (
            <List.Item key={customer.id}>
              {customer.name} - {customer.email}
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
}

export default ClientsPage;

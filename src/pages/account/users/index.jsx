import { Badge, Box, Button, List, rem, TextInput, ThemeIcon, Title } from "@mantine/core";
import { IconShieldLockFilled, IconUserShield } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { getUsers } from "../../../api/Users";
import { UsersTable } from "./_components/UsersTable";

function UsersPage() {
  const { data, isPending, isRefetching } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div>
      <Title mb={16}>Application Users</Title>
      {isPending ? (
        <span>Loading...</span>
      ) : (
        <UsersTable data={data}/>
      )}
    </div>
  );
}

export default UsersPage;

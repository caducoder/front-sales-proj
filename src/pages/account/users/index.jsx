import { Button, Title } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

import { getRoles } from "../../../api/Roles";
import { getUsers, updateUserRole } from "../../../api/Users";
import { useAuth } from "../../../hooks/useAuth";
import { UsersTable } from "./_components/UsersTable";

function UsersPage() {
  const { user } = useAuth();
  const {
    data: users,
    isPending: isPendingUsers,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { data: roles, isPending: isPendingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: (user_id, role_id) => {
      return updateUserRole(user_id, role_id);
    },
    onSuccess: () => {
      toast.success("User role updated");
    },
    onError: (error) => {
      toast.error(error?.response?.data.message);
    },
  });
  return (
    <div>
      <Title mb={16}>Application Users</Title>
      <Button onClick={refetch} loading={isRefetching}>
        Refresh
      </Button>
      {isPendingUsers || isPendingRoles ? (
        <span>Loading...</span>
      ) : (
        <UsersTable
          data={users}
          roles={roles}
          updateRole={mutate}
          isMutating={isMutating}
          isEditable={user.role === "admin"}
        />
      )}
    </div>
  );
}

export default UsersPage;

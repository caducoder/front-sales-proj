import { Box, Button, List, rem, TextInput, ThemeIcon, Title } from "@mantine/core";
import { IconShieldLockFilled } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createRole, getRoles } from "../../api/Roles";

function SecurityPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { data, isPending, isRefetching } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
  const mutate = useMutation({
    mutationFn: (newRole) => {
      return createRole(newRole);
    },
    onSuccess: (response) => {
      console.log("Cargo criado com sucesso", response);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Cargo criado com sucesso");
    },
    onError: (error) => {
      toast.error(error?.response?.data.message);
    },
  });

  const sendForm = async (values) => {
    mutate.mutate(values);
  };

  return (
    <div>
      <Title mb={16}>Security Roles</Title>
      <Box mb={16}>
        <form onSubmit={handleSubmit(sendForm)}>
          <Box style={{ display: "flex", alignItems: "end", gap: 16 }}>
            <TextInput
              label="Create new role"
              {...register("name", { minLength: 3 })}
              error={errors.name ? errors.name.message : null}
            />
            <Button type="submit" variant="filled">
              Create role
            </Button>
          </Box>
        </form>
      </Box>
      {isPending || isRefetching ? (
        <span>Loading...</span>
      ) : (
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconShieldLockFilled
                style={{ width: rem(16), height: rem(16) }}
              />
            </ThemeIcon>
          }
        >
          {data.map((role) => (
            <List.Item key={role.id}>{role.name}</List.Item>
          ))}
        </List>
      )}
    </div>
  );
}

export default SecurityPage;

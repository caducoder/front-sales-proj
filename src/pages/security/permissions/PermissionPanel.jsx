import {
  Divider,
  Paper,
  Stack,
  Switch,
  Grid,
  Button,
  Text,
  Title,
  Group,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPermissionsByRole } from "../../../api/Roles";
import { getDepartments } from "../../../api/Departments";
import { useToggle } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";

function PermissionPanel() {
  const { roleId } = useParams();
  const [initialData, setInitialData] = useState([]);
  const { data: departments, isPending: isPendingDepartments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
  const { data: permissions, isPending: isPendingPermissions } = useQuery({
    queryKey: ["permissions", roleId],
    queryFn: () => getPermissionsByRole(roleId),
    enabled: !!roleId,
  });
  const [isEditing, toggleEdit] = useToggle();
  const [modifiedPermissions, setModifiedPermissions] = useState(initialData);
  // console.log("bloco de alterações:", modifiedPermissions);
  const handleSwitchChange = (moduleId, action, isActive) => {
    console.log("Alterando", moduleId, action, isActive);
    setModifiedPermissions((prev) => {
      const updatedPermissions = prev.map((module) =>
        module.moduleId === moduleId
          ? {
              ...module,
              permissions: module.permissions.map((perm) =>
                perm.action === action ? { ...perm, isActive } : perm
              ),
            }
          : module
      );
      console.log("updatedPermissions", updatedPermissions);
      return updatedPermissions;
    });
  };

  // console.log("initialData", initialData);

  const buildPermissionsArrayObject = () => {
    const permissionsArray = [];

    for (const department of departments) {
      permissionsArray.push(
        <Grid.Col span={3} key={department.name}>
          <Paper shadow="md" radius="md" p="sm" withBorder>
            <Text style={{ textTransform: "capitalize" }}>
              {department.name}
            </Text>
            <Stack mt="xs">
              {["create", "read", "update", "delete"].map((action) => (
                <Switch
                  key={action}
                  value={action}
                  label={action}
                  size="lg"
                  color="indigo"
                  onLabel="ON"
                  offLabel="OFF"
                  checked={
                    modifiedPermissions
                      ?.find((mod) => mod.moduleName === department.name)
                      ?.permissions.find((perm) => perm.action === action)
                      ?.isActive || false
                  }
                  onChange={(event) => {
                    handleSwitchChange(
                      department.id,
                      action,
                      event.currentTarget.checked
                    );
                  }}
                  disabled={!isEditing}
                />
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
      );
    }

    permissionsArray.push(
      <Grid.Col span={3}>
        <Paper shadow="md" radius="md" p="sm" withBorder>
          <Text style={{ textTransform: "capitalize" }}>Geral</Text>
          <Stack mt="xs">
            {["access_dashboard", "generate_reports"].map((action) => (
              <Switch
                key={action}
                value={action}
                label={action.replace("_", " ")}
                size="lg"
                color="indigo"
                onLabel="ON"
                offLabel="OFF"
                checked={
                  modifiedPermissions
                    ?.find((mod) => mod.moduleId === null)
                    ?.permissions.find((perm) => perm.action === action)
                    ?.isActive || false
                }
                onChange={(event) =>
                  handleSwitchChange(null, action, event.currentTarget.checked)
                }
                disabled={!isEditing}
              />
            ))}
          </Stack>
        </Paper>
      </Grid.Col>
    );

    return permissionsArray;
  };

  const handleSave = async () => {
    // TODO: Salvar as alterações
    console.log("SALVANDO", modifiedPermissions);
  };

  useEffect(() => {
    if (permissions) {
      setInitialData(permissions.permissions);
      setModifiedPermissions(permissions.permissions);
      toggleEdit(false);
    }
  }, [permissions]);

  if (isPendingDepartments || isPendingPermissions) {
    return <p>Carregando...</p>;
  }

  // console.log("Permissões", permissions);
  // console.log("Departamentos", departments);
  // console.log("Dados iniciais", initialData);

  return (
    <Paper>
      <Title order={2}>Permissões {permissions?.name}</Title>
      <Button onClick={toggleEdit} disabled={isEditing} my={8}>
        {isEditing ? "Editando..." : "Editar"}
      </Button>
      <Grid>{buildPermissionsArrayObject()}</Grid>
      {isEditing && (
        <Group mt={20}>
          <Button variant="outline" color="dark" onClick={toggleEdit}>
            Cancelar
          </Button>
          <Button variant="filled" color="teal" onClick={handleSave}>
            Salvar
          </Button>
        </Group>
      )}
    </Paper>
  );
}

export default PermissionPanel;

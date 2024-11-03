import { Avatar, Badge, Group, Select, Table, Text } from "@mantine/core";
import dayjs from "dayjs";

const data = [
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
    name: "Robert Wolfkisser",
    job: "Engineer",
    email: "rob_wolf@gmail.com",
    role: "Collaborator",
    lastActive: "2 days ago",
    active: true,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
    name: "Jill Jailbreaker",
    job: "Engineer",
    email: "jj@breaker.com",
    role: "Collaborator",
    lastActive: "6 days ago",
    active: true,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
    name: "Henry Silkeater",
    job: "Designer",
    email: "henry@silkeater.io",
    role: "Contractor",
    lastActive: "2 days ago",
    active: false,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    name: "Bill Horsefighter",
    job: "Designer",
    email: "bhorsefighter@gmail.com",
    role: "Contractor",
    lastActive: "5 days ago",
    active: true,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
    name: "Jeremy Footviewer",
    job: "Manager",
    email: "jeremy@foot.dev",
    role: "Manager",
    lastActive: "3 days ago",
    active: false,
  },
];

const rolesData = ["admin", "visitor", "moderator"];

export function UsersTable({
  data,
  roles,
  updateRole,
  isMutating,
  isEditable,
}) {
  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div style={{ textAlign: "left" }}>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Select
          data={roles.map((role) => ({
            value: String(role.id),
            label: role.name,
          }))}
          defaultValue={String(
            roles.find((role) => role.name === item.role).id
          )}
          variant="unstyled"
          onChange={(_value, option) => {
            updateRole(item.id, _value);
          }}
          allowDeselect={false}
          disabled={isMutating || !isEditable}
        />
      </Table.Td>
      <Table.Td>{dayjs(item.created_at).format("DD/MM/YYYY")}</Table.Td>
      <Table.Td>
        <Badge fullWidth variant="light">
          Active
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm" withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Since</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

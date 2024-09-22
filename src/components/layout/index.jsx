import {
  AppShell,
  Badge,
  Burger,
  Button,
  Group,
  Skeleton,
  Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { DoubleNavbar } from "../doubleNavbar";

export function AppLayout() {
  const { user, Logout } = useAuth();
  const [mobileOpened, { open: openSidebar, close: closeSidebar }] =
    useDisclosure();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger
            opened={mobileOpened}
            onClick={openSidebar}
            hiddenFrom="sm"
            size="sm"
          />
          <div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <p>
                Olá <b>{user?.name}</b>
              </p>
              <Badge size="xs" color="cyan">
                {user?.role}
              </Badge>
            </div>

            <Button variant="outline" color={"red"} onClick={Logout}>
              Sair
            </Button>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="0" component={"div"}>
        <DoubleNavbar closeSidebar={closeSidebar} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

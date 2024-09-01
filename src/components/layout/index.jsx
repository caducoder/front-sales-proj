import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

import { DoubleNavbar } from "../doubleNavbar";

export function AppLayout() {
  const [mobileOpened, { open: openSidebar, close: closeSidebar }] =
    useDisclosure();

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
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={openSidebar}
            hiddenFrom="sm"
            size="sm"
          />
          {/* <Burger
            opened={!desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          /> */}
          {/* <img src="https://img.logoipsum.com/285.svg" alt="Logo" width={150} /> */}
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

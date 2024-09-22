import {
  ActionIcon,
  Badge,
  Box,
  Burger,
  Button,
  Group,
  Skeleton,
  Space,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { NavbarMinimalColored } from "../sideNavbar";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
  IconArrowWaveLeftUp,
} from "@tabler/icons-react";
import classes from "./Layout.module.css";
import { createContext } from "react";
import { useMenu } from "../../hooks/useMenu";

const linksMockdata = [
  "Security",
  "Settings",
  "Dashboard",
  "Releases",
  "Account",
  "Orders",
  "Clients",
  "Databases",
  "Pull Requests",
  "Open Issues",
  "Wiki pages",
];

export function AppLayout() {
  const { user, Logout } = useAuth();
  const { activeLinks, currentSegment, activeSection, handleNavigation } =
    useMenu();
  const [opened, { toggle }] = useDisclosure(true);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  const links = activeLinks.map((link) => (
    <a
      className={classes.link}
      data-active={activeSection === link.toLowerCase() || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        console.log(`Cliquei em ${link}`);
        handleNavigation(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <NavbarMinimalColored />
      <Box
        // className={classes.sideInnerBar}
        style={{
          transition: "all 0.4s ease",
          width: opened ? 240 : 0,
          transform: opened ? "translateX(0)" : "translateX(-240px)",
          position: "relative",
        }}
      >
        <ActionIcon
          style={{
            position: "absolute",
            top: 10,
            right: opened ? -28 : -265,
            transition: "all 0.4s ease",
          }}
          onClick={toggle}
        >
          {opened ? <IconArrowBigLeftFilled /> : <IconArrowBigRightFilled />}
        </ActionIcon>
        <Box p={12}>
          <Text size="xl" fw={700}>
            Menu
          </Text>
        </Box>
        <div className={classes.main}>{links}</div>
      </Box>

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: 12,
            padding: "8px 12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <p>
              <b>{user?.name}</b>
            </p>
            <Badge size="sm" color="cyan" radius={"xs"}>
              {user?.role}
            </Badge>
          </div>
        </div>
        <main style={{ padding: 20 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

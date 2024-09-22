import {
  Box,
  Center,
  rem,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import classes from "./NavbarMinimalColored.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function NavbarLink({ icon: Icon, label, active, onClick }) {
  return (
    <Tooltip
      label={label}
      position="right"
      transitionProps={{ duration: 0 }}
      withArrow
    >
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon
          style={{
            width: rem(20),
            height: rem(20),
            color: active ? "rgb(34, 139, 230)" : "#fff",
          }}
          stroke={1.5}
        />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconCalendarStats, label: "Appointments" },
  { icon: IconUser, label: "Account" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconSettings, label: "Settings" },
];

export function NavbarMinimalColored() {
  const [active, setActive] = useState("Home");
  const { Logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/");
    const activeSegment = path.length > 2 ? path[2] : "";
    const activeLink = mockdata.find(
      (link) => link.label.toLowerCase() === (activeSegment || "home")
    );
    if (activeLink) {
      setActive(activeLink.label);
    }
  }, [location]);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.label === active || undefined}
      onClick={() => {
        setActive(link.label);
        navigate(`${link.label.toLowerCase()}`);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <img src="https://img.logoipsum.com/225.svg" alt="Logo" />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
      <Box flex={1} />
      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" onClick={Logout} />
      </Stack>
    </nav>
  );
}

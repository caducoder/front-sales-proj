import { ActionIcon, Box, rem, Title, Tooltip, UnstyledButton } from "@mantine/core";
import { IconArrowLeft, IconCalendarStats, IconDeviceDesktopAnalytics, IconFingerprint, IconGauge, IconHome2, IconSettings, IconSignLeft, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import classes from "./DoubleNavbar.module.css";

const mainLinksMockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconCalendarStats, label: "Appointments" },
  { icon: IconUser, label: "Account" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconSettings, label: "Settings" },
];

const sectionLinks = {
  Home: ["Dashboard", "Analytics"],
  Analytics: ["Products", "Orders"],
  Appointments: ["Calendar"],
  Account: ["Customers", "Users"],
  Security: ["Data shared", "2FA"],
  Settings: ["Theme", "Languages"],
};

export function DoubleNavbar({ closeSidebar }) {
  const location = useLocation();
  const [active, setActive] = useState("Home");
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => {
          setActive(link.label);
          setActiveLink("");
          navigate(`${link.label.toLowerCase()}`);
        }}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = sectionLinks[active].map((link) => (
    <Link
      className={classes.link}
      data-active={activeLink === link || undefined}
      to={`${active.toLowerCase()}/${link.toLowerCase()}`}
      onClick={(event) => {
        // event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <img src="https://img.logoipsum.com/225.svg" alt="Logo" />
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <div className={classes.header}>
            <Title order={4} className={classes.title}>
              {active}
            </Title>
            <Box hiddenFrom="sm">
              <ActionIcon onClick={closeSidebar} variant="subtle" color="green">
                <IconArrowLeft />
              </ActionIcon>
            </Box>
          </div>

          {links}
        </div>
      </div>
    </nav>
  );
}

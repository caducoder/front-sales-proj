import { Badge } from "@mantine/core";

import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { NavbarMinimalColored } from "../sideNavbar";
import { AuthProvider } from "../../context/AuthContext";

export function AppLayout() {
  const { user, Logout } = useAuth();
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <NavbarMinimalColored />
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "94vw",
          overflow: "auto",
        }}
      >
        <div style={{ flex: 1, overflow: "auto" }}>
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
          <main style={{ padding: 20, width: "100%", overflow: "scroll" }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

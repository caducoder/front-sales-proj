import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoaderComponent from "../components/loader";

export const withAuth = (WrappedComponent, config = null) => {
  return function WithAuthComponent(props) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return <LoaderComponent />;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (!config) {
      return <WrappedComponent {...props} />;
    }

    const { allowedRoles, allowedModules, requireAll = false } = config;

    let hasAccess = true;

    if (allowedRoles) {
      if (requireAll) {
        hasAccess = allowedRoles.every((role) => user.role === role);
      } else {
        hasAccess = allowedRoles.some((role) => user.role === role);
      }
    }

    if (hasAccess && allowedModules && user.moduleId) {
      if (requireAll) {
        hasAccess = allowedModules.every(
          (moduleId) => user.moduleId === moduleId
        );
      } else {
        hasAccess = allowedModules.some(
          (moduleId) => user.moduleId === moduleId
        );
      }
    }

    if (user.role === "admin") {
      hasAccess = true;
    }

    if (!hasAccess) {
      return <Navigate to="/app/unauthorized" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

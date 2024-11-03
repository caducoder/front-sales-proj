import { useAuth } from "./useAuth";

export const useHasRole = (roles) => {
  const { user } = useAuth();

  if (!user) return false;
  if (user.role === "admin") return true;

  const roleArray = Array.isArray(roles) ? roles : [roles];

  return roleArray.includes(user.role);
};

export const useHasModule = (modules) => {
  const { user } = useAuth();

  if (!user) return false;
  if (user.role === "admin") return true;
  if (!user.moduleId) return false;

  const moduleArray = Array.isArray(modules) ? modules : [modules];
  return moduleArray.includes(user.moduleId);
};

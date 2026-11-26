export type Role = "USER" | "MENTOR" | "ADMIN";

export type AuthUser = {
  token: string;
  id: string;
  email: string;
  fullName: string;
  role: Role;
  status: string;
};

export function subscribeToAuthChanges(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("auth:changed", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("auth:changed", onChange);
  };
}

export function getStoredAuthUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = localStorage.getItem("authUser");
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setStoredAuthUser(user: AuthUser) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("authToken", user.token);
  localStorage.setItem("authUser", JSON.stringify(user));
  window.dispatchEvent(new Event("auth:changed"));
}

export function getRoleHome(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "MENTOR":
      return "/mentor";
    case "USER":
    default:
      return "/student";
  }
}

export function clearAuth() {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
  window.dispatchEvent(new Event("auth:changed"));
}

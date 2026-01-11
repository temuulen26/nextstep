export type Role = "USER" | "MENTOR" | "ADMIN";

export type AuthUser = {
  token: string;
  id: string;
  email: string;
  fullName: string;
  role: Role;
  status: string;
};

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
}

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
export const API_URL = `${RAW_API_URL.replace(/\/$/, "")}/api`;

async function parseErrorMessage(res: Response) {
  try {
    const data = await res.json();
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
  } catch {
    // Fall back to status text.
  }
  return res.statusText || "Request failed";
}

function getAuthHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchJson<TResponse>(
  path: string,
  options?: { token?: string }
): Promise<TResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      ...getAuthHeaders(options?.token),
    },
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return res.json() as Promise<TResponse>;
}

export async function postJson<TResponse>(
  path: string,
  body: Record<string, unknown>,
  options?: { token?: string }
): Promise<TResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(options?.token),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return res.json() as Promise<TResponse>;
}

export async function putJson<TResponse>(
  path: string,
  body: Record<string, unknown>,
  options?: { token?: string }
): Promise<TResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(options?.token),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return res.json() as Promise<TResponse>;
}

export async function deleteJson<TResponse = void>(
  path: string,
  options?: { token?: string }
): Promise<TResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(options?.token),
    },
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  // DELETE might not return content
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined as TResponse;
  }

  return res.json() as Promise<TResponse>;
}

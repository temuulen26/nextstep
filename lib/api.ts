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

export async function postJson<TResponse>(
  path: string,
  body: Record<string, unknown>
): Promise<TResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return res.json() as Promise<TResponse>;
}

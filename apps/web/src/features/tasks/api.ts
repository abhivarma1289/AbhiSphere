import type { Paginated } from "./types";
import type { Task } from "./types";
import { getIdToken } from "../../lib/authToken";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = await getIdToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");
  return fetch(input, { ...init, headers });
}

export async function listTasks(params?: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<Paginated<Task>> {
  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  const res = await authFetch(`${API_URL}/tasks?${qs.toString()}`);
  if (!res.ok) throw new Error(`List tasks failed: ${res.status}`);
  return res.json();
}

export async function createTask(body: {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
}): Promise<Task> {
  const res = await authFetch(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Create task failed: ${res.status}`);
  return res.json();
}

export async function deleteTask(id: string): Promise<{ ok: true }> {
  const res = await authFetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Delete task failed: ${res.status}`);
  return res.json();
}

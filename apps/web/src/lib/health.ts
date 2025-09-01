import { api } from "./api";

export interface Health {
  ok: boolean;
}

export const getHealth = () => api<Health>("/health");

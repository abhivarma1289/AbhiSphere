import { useEffect, useState } from "react";
import type { Task } from "./types";
import type { Paginated } from "./types";
import { listTasks, createTask, deleteTask } from "./api";

export function useTasks() {
  const [data, setData] = useState<Paginated<Task> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);
      const res = await listTasks({ page: 1, limit: 50 });
      setData(res);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function addTask(payload: {
    title: string;
    description?: string;
    dueDate?: string;
    priority?: string;
  }) {
    await createTask(payload);
    await refresh();
  }

  async function removeTask(id: string) {
    await deleteTask(id);
    await refresh();
  }

  return { data, loading, error, refresh, addTask, removeTask };
}

import { useState } from "react";
import { Stack, TextField, Button, MenuItem } from "@mui/material";

type Props = {
  onCreate: (input: { title: string; description?: string; dueDate?: string; priority?: string }) => Promise<void> | void;
};

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await onCreate({
          title: title.trim(),
          description: description || undefined,
          dueDate: dueDate || undefined,
          priority,
        });
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("medium");
      }}
    >
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
      <TextField label="Priority" select value={priority} onChange={(e) => setPriority(e.target.value)} sx={{ minWidth: 150 }}>
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
      <TextField
        label="Due date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ minWidth: 190 }}
      />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
      <Button type="submit" variant="contained">Add</Button>
    </Stack>
  );
}

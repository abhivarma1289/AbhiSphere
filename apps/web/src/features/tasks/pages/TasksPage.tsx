import { useTasks } from "../hooks";
import TaskForm from "../components/TaskForm";
import {
  Box, Card, CardContent, CardActions, Typography, IconButton, Stack, LinearProgress, Alert, Chip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TasksPage() {
  const { data, loading, error, addTask, removeTask } = useTasks();

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Tasks</Typography>

      <Box sx={{ mb: 3 }}>
        <TaskForm onCreate={addTask} />
      </Box>

      {loading && <LinearProgress sx={{ my: 2 }} />}
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      <Stack spacing={2}>
        {(data?.items ?? []).map((t) => (
          <Card key={t._id} variant="outlined">
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{t.title}</Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label={t.priority} size="small" />
                  <Chip label={t.status} size="small" />
                </Stack>
              </Stack>
              {t.description && <Typography color="text.secondary" sx={{ mt: 0.5 }}>{t.description}</Typography>}
              {t.dueDate && (
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Due: {new Date(t.dueDate).toLocaleString()}
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <IconButton aria-label="delete task" onClick={() => removeTask(t._id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
        {(!loading && (data?.items?.length ?? 0) === 0) && (
          <Typography color="text.secondary">No tasks yet—add one above.</Typography>
        )}
      </Stack>
    </Box>
  );
}

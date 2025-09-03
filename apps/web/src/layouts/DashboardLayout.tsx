import { Outlet, NavLink } from "react-router-dom";
import {
    AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton, ListItemText, IconButton, Divider, Container
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import ThemeSwitcher from "../theme/ThemeSwitcher";

const drawerWidth = 220;

const links = [
    { to: "/dashboard", label: "Home" },
    { to: "/dashboard/tasks", label: "Tasks" },
    { to: "/dashboard/notes", label: "Notes" },
    { to: "/dashboard/meetings", label: "Meetings" },
    { to: "/dashboard/expenses", label: "Expenses" },
];

export default function DashboardLayout() {
    const [open, setOpen] = useState(true);
    const auth = getAuth();

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>AbhiSphere</Typography>

                    {/* theme switcher */}
                    <div style={{ marginRight: 16 }}>
                        <ThemeSwitcher />
                    </div>

                    {/* logout */}
                    <Typography role="button" tabIndex={0} onClick={() => signOut(auth)} sx={{ cursor: "pointer" }}>
                        Logout
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="persistent" open={open} sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
            }}>
                <Toolbar />
                <Divider />
                <List>
                    {links.map((l) => (
                        <ListItemButton
                            key={l.to}
                            component={NavLink}
                            to={l.to}
                            sx={{
                                "&.active": { bgcolor: "action.selected" },
                            }}
                        >
                            <ListItemText primary={l.label} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}

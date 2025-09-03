import { useAppTheme } from "./ThemeProvider";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ColorLensIcon from "@mui/icons-material/ColorLens";

export default function ThemeSwitcher() {
    const { themeName, setThemeName } = useAppTheme();

    return (
        <Box sx={{ minWidth: 170 }}>
            <FormControl size="small" fullWidth>
                <InputLabel id="theme-label">Theme</InputLabel>
                <Select
                    labelId="theme-label"
                    label="Theme"
                    value={themeName}
                    onChange={(e) => setThemeName(e.target.value as any)}
                >
                    <MenuItem value="light"><LightModeIcon sx={{ mr: 1 }} /> Light</MenuItem>
                    <MenuItem value="dark"><DarkModeIcon sx={{ mr: 1 }} /> Dark</MenuItem>
                    <MenuItem value="ocean"><ColorLensIcon sx={{ mr: 1 }} /> Ocean</MenuItem>
                    <MenuItem value="emerald"><ColorLensIcon sx={{ mr: 1 }} /> Emerald</MenuItem>
                    <MenuItem value="plum"><ColorLensIcon sx={{ mr: 1 }} /> Plum</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

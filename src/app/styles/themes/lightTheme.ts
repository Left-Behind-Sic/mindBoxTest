import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
	palette: {
		primary: {
			main: "#ead8da",
		},
		secondary: {
			main: "#777777",
		},
		background: {
			default: "#f5f5f5",
			paper: "#ffffff",
		},
		text: {
			primary: "#4d4d4d",
			secondary: "#b2b2b2",
			disabled: "#d9d9d9",
		},
	},
	typography: {
		fontFamily: "'Helvetica Neue', Arial, sans-serif",
		h4: {
			fontWeight: 100,
			color: "#ead8da",
			fontSize: "5rem",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					color: "#b2b2b2",
				},
			},
		},
	},
});

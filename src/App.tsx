import Todo from "./components/Todo";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

const theme = createTheme({
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
		MuiCheckbox: {
			styleOverrides: {
				root: {
					borderRadius: "50%",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					color: "#b2b2b2",
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow:
						"0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 25px 50px 0 rgba(0, 0, 0, 0.05)",
				},
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					minHeight: "100vh",
					padding: 2,
					backgroundColor: "background.default",
				}}
			>
				<Todo />
			</Box>
		</ThemeProvider>
	);
}

export default App;

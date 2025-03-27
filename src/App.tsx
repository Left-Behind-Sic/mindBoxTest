import Todo from "./components/Todo";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { TodosProvider } from "./context/TodosContext/TodosProvider";
import { FilterProvider } from "./context/FilterContext/FilterProvider";
import { CompletedProvider } from "./context/CompletedContext/CompletedProvider";
import { InputProvider } from "./context/InputContext/InputProvider";

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

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TodosProvider>
				<FilterProvider>
					<CompletedProvider>
						<InputProvider>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									height: "100vh",
									minWidth: 350,
									backgroundColor: "background.default",
								}}
							>
								<Todo />
							</Box>
						</InputProvider>
					</CompletedProvider>
				</FilterProvider>
			</TodosProvider>
		</ThemeProvider>
	);
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, Box } from "@mui/material";
import { CompletedContextProvider } from "@/app/providers/CompletedContextProvider";
import { FilterContextProvider } from "@/app/providers/FilterContextProvider";
import { InputContextProvider } from "@/app/providers/InputContextProvider";
import { ThemeProviderComponent } from "@/app/providers/ThemeProviderComponent";
import { TodosContextProvider } from "@/app/providers/TodoContextProvider";
import { TodoPage } from "@/pages/TodoPage/ui/TodoPage";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProviderComponent>
			<CssBaseline />
			<TodosContextProvider>
				<FilterContextProvider>
					<CompletedContextProvider>
						<InputContextProvider>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									height: "100vh",
									minWidth: 350,
									backgroundColor: "background.default",
								}}>
								<TodoPage />
							</Box>
						</InputContextProvider>
					</CompletedContextProvider>
				</FilterContextProvider>
			</TodosContextProvider>
		</ThemeProviderComponent>
	</StrictMode>
);

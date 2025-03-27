import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { InputProvider } from "../context/InputContext/InputProvider";
import { TodosProvider } from "../context/TodosContext/TodosProvider";
import { FilterProvider } from "../context/FilterContext/FilterProvider";
import { CompletedProvider } from "../context/CompletedContext/CompletedProvider";

export const AllTheProviders = ({ children }: { children: ReactNode }) => {
	return (
		<TodosProvider>
			<InputProvider>
				<FilterProvider>
					<CompletedProvider>{children}</CompletedProvider>
				</FilterProvider>
			</InputProvider>
		</TodosProvider>
	);
};

export const renderWithProviders = (ui: React.ReactElement) => {
	return render(ui, { wrapper: AllTheProviders });
};

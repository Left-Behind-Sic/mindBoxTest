import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { FilterContextProvider } from "@/app/providers/FilterContextProvider";
import { TodosContextProvider } from "@/app/providers/TodoContextProvider";
import { CompletedContextProvider } from "@/app/providers/CompletedContextProvider";
import { InputContextProvider } from "@/app/providers/InputContextProvider";

export const AllTheProviders = ({ children }: { children: ReactNode }) => {
	return (
		<TodosContextProvider>
			<InputContextProvider>
				<FilterContextProvider>
					<CompletedContextProvider>{children}</CompletedContextProvider>
				</FilterContextProvider>
			</InputContextProvider>
		</TodosContextProvider>
	);
};

export const componentRender = (ui: React.ReactElement) => {
	return render(ui, { wrapper: AllTheProviders });
};

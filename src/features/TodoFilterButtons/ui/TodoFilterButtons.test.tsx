import { screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { TodoFilterButtons } from "./TodoFilterButtons";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

describe("TodoFilter компонент", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("рендерит все кнопки фильтрации", () => {
		componentRender(<TodoFilterButtons />);

		expect(screen.getByText("All")).toBeInTheDocument();
		expect(screen.getByText("Active")).toBeInTheDocument();
		expect(screen.getByText("Completed")).toBeInTheDocument();
	});

	it("переключает фильтр при клике на кнопки", () => {
		componentRender(<TodoFilterButtons />);

		const allButton = screen.getByText("All");
		expect(allButton.closest("button")).toHaveStyle(
			"border: 1px solid #EDDADA"
		);

		fireEvent.click(screen.getByText("Active"));

		fireEvent.click(screen.getByText("Completed"));

		fireEvent.click(screen.getByText("All"));
	});
});

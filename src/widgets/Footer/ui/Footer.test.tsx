import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { Footer } from "./Footer";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

vi.mock("@/features/ItemsLeftCounter", () => ({
	ItemsLeftCounter: () => (
		<div data-testid="item-left-counter">ItemLeftCounter</div>
	),
}));

vi.mock("@/features/TodoFilterButtons", () => ({
	TodoFilterButtons: () => <div data-testid="todo-filter">TodoFilter</div>,
}));

vi.mock("@/entities/ClearCompletedButton", () => ({
	ClearCompletedButton: () => (
		<div data-testid="clear-completed-button">ClearCompletedButton</div>
	),
}));
const render = () => componentRender(<Footer />);
describe("Footer компонент", () => {
	it("имеет разделительную линию сверху", () => {
		render();

		const footerElement = screen
			.getByTestId("item-left-counter")
			.closest('div[class*="MuiBox"]');
		expect(footerElement).toHaveStyle("border-top: 1px solid #ededed");
	});

	it("имеет правильную сетку из трех колонок", () => {
		render();

		const footerElement = screen
			.getByTestId("item-left-counter")
			.closest('div[class*="MuiBox"]');
		expect(footerElement).toHaveStyle("grid-template-columns: 1fr 1fr 1fr");
	});
});

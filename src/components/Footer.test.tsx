import { screen } from "@testing-library/react";
import Footer from "./Footer";
import { vi, describe, it, expect } from "vitest";
import { renderWithProviders } from "../__tests__/testUtils";

vi.mock("./ItemLeftCounter", () => ({
	default: () => <div data-testid="item-left-counter">ItemLeftCounter</div>,
}));

vi.mock("./TodoFilter", () => ({
	default: () => <div data-testid="todo-filter">TodoFilter</div>,
}));

vi.mock("./ClearCompletedButton", () => ({
	default: () => (
		<div data-testid="clear-completed-button">ClearCompletedButton</div>
	),
}));

describe("Footer компонент", () => {
	it("рендерит все дочерние компоненты", () => {
		renderWithProviders(<Footer />);

		expect(screen.getByTestId("item-left-counter")).toBeInTheDocument();
		expect(screen.getByTestId("todo-filter")).toBeInTheDocument();
		expect(screen.getByTestId("clear-completed-button")).toBeInTheDocument();
	});

	it("имеет разделительную линию сверху", () => {
		renderWithProviders(<Footer />);

		const footerElement = screen
			.getByTestId("item-left-counter")
			.closest('div[class*="MuiBox"]');
		expect(footerElement).toHaveStyle("border-top: 1px solid #ededed");
	});

	it("имеет правильную сетку из трех колонок", () => {
		renderWithProviders(<Footer />);

		const footerElement = screen
			.getByTestId("item-left-counter")
			.closest('div[class*="MuiBox"]');
		expect(footerElement).toHaveStyle("grid-template-columns: 1fr 1fr 1fr");
	});
});

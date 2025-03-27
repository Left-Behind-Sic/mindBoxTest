import { screen } from "@testing-library/react";
import TodoForm from "./TodoForm";
import { vi, describe, it, expect } from "vitest";
import { renderWithProviders } from "../__tests__/testUtils";

vi.mock("./TodoInput", () => ({
	default: () => <div data-testid="todo-input">TodoInput</div>,
}));

describe("TodoForm компонент", () => {
	it("рендерит TodoInput", () => {
		renderWithProviders(<TodoForm />);
		expect(screen.getByTestId("todo-input")).toBeInTheDocument();
	});

	it("рендерит кнопку с иконкой", () => {
		renderWithProviders(<TodoForm />);
		const iconButton = screen.getByRole("button");
		expect(iconButton).toBeInTheDocument();
	});
});

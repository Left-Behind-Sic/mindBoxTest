import { screen } from "@testing-library/react";
import Todo from "./Todo";
import { vi, describe, it, expect } from "vitest";
import { renderWithProviders } from "../__tests__/testUtils";

vi.mock("./TodoForm", () => ({
	default: () => <div data-testid="todo-form">TodoForm</div>,
}));

vi.mock("./TodoList", () => ({
	default: () => <div data-testid="todo-list">TodoList</div>,
}));

vi.mock("./Footer", () => ({
	default: () => <div data-testid="footer">Footer</div>,
}));

describe("Todo компонент", () => {
	it("рендерит заголовок", () => {
		renderWithProviders(<Todo />);
		expect(screen.getByText("todos")).toBeInTheDocument();
	});

	it("рендерит все необходимые дочерние компоненты", () => {
		renderWithProviders(<Todo />);
		expect(screen.getByTestId("todo-form")).toBeInTheDocument();
		expect(screen.getByTestId("todo-list")).toBeInTheDocument();
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});
});

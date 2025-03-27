import { screen } from "@testing-library/react";
import TodoList from "./TodoList";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { renderWithProviders } from "../__tests__/testUtils";
import { ITodo } from "../types/todo";

vi.mock("./TodoItem", () => ({
	default: ({ todo }: { todo: ITodo }) => (
		<div data-testid={`todo-item-${todo.id}`}>{todo.text}</div>
	),
}));

describe("TodoList компонент", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("отображает список задач из контекста", () => {
		renderWithProviders(<TodoList />);

		expect(screen.getByText("empty")).toBeInTheDocument();
	});
});

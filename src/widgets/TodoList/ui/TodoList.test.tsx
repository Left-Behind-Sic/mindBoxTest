import { screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { TodoList } from "./TodoList";
import { TodoItemSchema } from "@/entities/Todo";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

vi.mock("./TodoItem", () => ({
	default: ({ todo }: { todo: TodoItemSchema }) => (
		<div data-testid={`todo-item-${todo.id}`}>{todo.text}</div>
	),
}));

describe("TodoList компонент", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("отображает список задач из контекста", () => {
		componentRender(<TodoList />);

		expect(screen.getByText("empty")).toBeInTheDocument();
	});
});

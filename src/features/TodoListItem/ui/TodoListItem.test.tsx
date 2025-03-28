import { screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { TodoListItem } from "./TodoListItem";
import { TodoItemSchema } from "@/entities/Todo";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

describe("TodoItem компонент", () => {
	const mockToggleTodo = vi.fn();
	const mockDeleteTodo = vi.fn();

	const mockTodo: TodoItemSchema = {
		id: "1",
		text: "Тестовая задача",
		completed: false,
	};

	const mockCompletedTodo: TodoItemSchema = {
		id: "2",
		text: "Завершенная задача",
		completed: true,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderTodoListItem = (todo: TodoItemSchema) =>
		componentRender(
			<TodoListItem
				todo={todo}
				toggleTodo={mockToggleTodo}
				deleteTodo={mockDeleteTodo}
			/>
		);

	it("рендерит задачу с правильным текстом", () => {
		renderTodoListItem(mockTodo);
		expect(screen.getByText("Тестовая задача")).toBeInTheDocument();
	});

	it("вызывает toggleTodo при клике на чекбокс", () => {
		renderTodoListItem(mockTodo);

		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);

		expect(mockToggleTodo).toHaveBeenCalledWith("1");
	});

	it("вызывает deleteTodo при клике на кнопку удаления", () => {
		renderTodoListItem(mockTodo);

		const deleteButton = screen.getByRole("button");
		fireEvent.click(deleteButton);

		expect(mockDeleteTodo).toHaveBeenCalledWith("1");
	});

	it("отображает завершенную задачу с перечеркнутым текстом", () => {
		renderTodoListItem(mockCompletedTodo);

		const todoText = screen.getByText("Завершенная задача");
		expect(todoText).toHaveStyle("text-decoration: line-through");
	});
});

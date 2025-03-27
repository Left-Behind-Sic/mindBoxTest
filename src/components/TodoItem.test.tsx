import { screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { renderWithProviders } from "../__tests__/testUtils";
import { Todo } from "../types";

describe("TodoItem компонент", () => {
	const mockToggleTodo = vi.fn();
	const mockDeleteTodo = vi.fn();

	const mockTodo: Todo = {
		id: "1",
		text: "Тестовая задача",
		completed: false,
	};

	const mockCompletedTodo: Todo = {
		id: "2",
		text: "Завершенная задача",
		completed: true,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("рендерит задачу с правильным текстом", () => {
		renderWithProviders(
			<TodoItem
				todo={mockTodo}
				toggleTodo={mockToggleTodo}
				deleteTodo={mockDeleteTodo}
			/>
		);

		expect(screen.getByText("Тестовая задача")).toBeInTheDocument();
	});

	it("вызывает toggleTodo при клике на чекбокс", () => {
		renderWithProviders(
			<TodoItem
				todo={mockTodo}
				toggleTodo={mockToggleTodo}
				deleteTodo={mockDeleteTodo}
			/>
		);

		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);

		expect(mockToggleTodo).toHaveBeenCalledWith("1");
	});

	it("вызывает deleteTodo при клике на кнопку удаления", () => {
		renderWithProviders(
			<TodoItem
				todo={mockTodo}
				toggleTodo={mockToggleTodo}
				deleteTodo={mockDeleteTodo}
			/>
		);

		const deleteButton = screen.getByRole("button");
		fireEvent.click(deleteButton);

		expect(mockDeleteTodo).toHaveBeenCalledWith("1");
	});

	it("отображает завершенную задачу с перечеркнутым текстом", () => {
		renderWithProviders(
			<TodoItem
				todo={mockCompletedTodo}
				toggleTodo={mockToggleTodo}
				deleteTodo={mockDeleteTodo}
			/>
		);

		const todoText = screen.getByText("Завершенная задача");
		expect(todoText).toHaveStyle("text-decoration: line-through");
	});
});

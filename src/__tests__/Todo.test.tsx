import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../components/Todo";
import { ThemeProvider, createTheme } from "@mui/material";

// Мок для localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: vi.fn((key: string) => store[key] || null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value;
		}),
		clear: vi.fn(() => {
			store = {};
		}),
	};
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Создаем тему для тестов
const theme = createTheme();

// Обертка для компонентов чтобы предоставить тему
const renderWithTheme = (ui: React.ReactElement) => {
	return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("Todo Component", () => {
	beforeEach(() => {
		localStorageMock.clear();
		vi.clearAllMocks();
	});

	it("renders the todo form", () => {
		renderWithTheme(<Todo />);
		expect(
			screen.getByPlaceholderText("What needs to be done?")
		).toBeInTheDocument();
	});

	it("renders filter buttons when there are todos", () => {
		renderWithTheme(<Todo />);
		// Добавляем задачу, чтобы отобразились фильтры
		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Test task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(screen.getByText("All")).toBeInTheDocument();
		expect(screen.getByText("Active")).toBeInTheDocument();
		expect(screen.getByText("Completed")).toBeInTheDocument();
	});

	it("adds a new todo when submitting the form", () => {
		renderWithTheme(<Todo />);

		// Добавляем новую задачу
		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Test task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		// Проверяем, что задача появилась в списке
		expect(screen.getByText("Test task")).toBeInTheDocument();
	});

	it("toggles todo completion status", async () => {
		renderWithTheme(<Todo />);

		// Добавляем задачу
		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Toggle task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		// Находим чекбокс задачи и кликаем по нему
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked(); // Изначально не отмечен

		fireEvent.click(checkbox);

		// Проверяем по свойству checked, что чекбокс отмечен
		const checkedCheckbox = screen.getByRole("checkbox");
		expect(checkedCheckbox).toBeChecked();
	});

	it("deletes a todo when clicking the delete button", () => {
		renderWithTheme(<Todo />);

		// Добавляем задачу
		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Delete task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		// Проверяем, что задача добавлена
		expect(screen.getByText("Delete task")).toBeInTheDocument();

		// Имитируем наведение мыши на задачу для отображения кнопки удаления
		const listItem = screen.getByText("Delete task").closest("li");
		if (listItem) {
			fireEvent.mouseEnter(listItem);
		}

		// Находим кнопку удаления по иконке и нажимаем на неё
		const deleteButtons = screen.getAllByRole("button");
		// Находим последнюю кнопку (это должна быть кнопка удаления)
		const deleteButton = deleteButtons[deleteButtons.length - 1];
		fireEvent.click(deleteButton);

		// Проверяем, что задача удалена
		expect(screen.queryByText("Delete task")).not.toBeInTheDocument();
	});

	it("filters todos correctly", () => {
		renderWithTheme(<Todo />);

		// Добавляем две задачи
		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.keyDown(input, { key: "Enter" });

		// Помечаем первую задачу как выполненную
		const checkboxes = screen.getAllByRole("checkbox");
		fireEvent.click(checkboxes[1]);

		// Переключаемся на фильтр "Active"
		fireEvent.click(screen.getByText("Active"));

		// Проверяем, что видна только вторая задача
		expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
		expect(screen.getByText("Task 2")).toBeInTheDocument();

		// Переключаемся на фильтр "Completed"
		fireEvent.click(screen.getByText("Completed"));

		// Проверяем, что видна только первая задача
		expect(screen.getByText("Task 1")).toBeInTheDocument();
		expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
	});

	it("shows count of active items", () => {
		renderWithTheme(<Todo />);

		// Добавляем задачи
		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.keyDown(input, { key: "Enter" });

		// Проверяем счетчик активных задач
		expect(screen.getByText("2 items left")).toBeInTheDocument();

		// Помечаем задачу как выполненную
		const checkbox = screen.getAllByRole("checkbox")[0];
		fireEvent.click(checkbox);

		// Проверяем обновленный счетчик
		expect(screen.getByText("1 item left")).toBeInTheDocument();
	});

	it("clears completed todos", () => {
		renderWithTheme(<Todo />);

		// Добавляем задачи
		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.keyDown(input, { key: "Enter" });

		// Помечаем первую задачу как выполненную
		const checkbox = screen.getAllByRole("checkbox")[1];
		fireEvent.click(checkbox);

		// Нажимаем на кнопку "Clear completed"
		const clearButton = screen.getByText("Clear completed");
		fireEvent.click(clearButton);

		// Проверяем, что осталась только вторая задача
		expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
		expect(screen.getByText("Task 2")).toBeInTheDocument();
	});

	it("toggles all todos", () => {
		renderWithTheme(<Todo />);

		// Добавляем задачи
		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.keyDown(input, { key: "Enter" });

		// Убедимся, что чекбоксы изначально не отмечены
		const initialCheckboxes = screen.getAllByRole("checkbox");
		initialCheckboxes.forEach((cb) => expect(cb).not.toBeChecked());

		// Находим кнопку для выделения всех задач (первая кнопка с иконкой)
		const toggleAllButton = screen.getAllByRole("button")[0];
		fireEvent.click(toggleAllButton);

		// Проверяем, что все задачи выполнены
		const checkboxes = screen.getAllByRole("checkbox");
		checkboxes.forEach((checkbox) => {
			expect(checkbox).toBeChecked();
		});

		// Нажимаем еще раз, чтобы снять выделение со всех
		fireEvent.click(toggleAllButton);

		// Проверяем, что все задачи снова активны
		const updatedCheckboxes = screen.getAllByRole("checkbox");
		updatedCheckboxes.forEach((checkbox) => {
			expect(checkbox).not.toBeChecked();
		});
	});

	it("saves todos to localStorage", () => {
		// Очищаем моки перед тестом
		vi.clearAllMocks();
		renderWithTheme(<Todo />);

		// Проверяем, что localStorage.getItem был вызван при инициализации
		expect(localStorageMock.getItem).toHaveBeenCalledWith("todos");

		// Сбрасываем счетчики вызовов
		vi.clearAllMocks();

		// Добавляем задачу
		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Saved task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		// Проверяем, что localStorage.setItem был вызван
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			"todos",
			expect.any(String)
		);

		// Проверяем, что в localStorage сохранен массив, содержащий нашу задачу
		const calls = localStorageMock.setItem.mock.calls;
		const lastCall = calls[calls.length - 1];
		const savedData = JSON.parse(lastCall[1]);

		expect(savedData).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					text: "Saved task",
					completed: false,
				}),
			])
		);
	});
});

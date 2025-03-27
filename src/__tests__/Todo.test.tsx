import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import Todo from "../components/Todo";
import { ThemeProvider, createTheme } from "@mui/material";
import { renderWithProviders } from "./testUtils";

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

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
	return renderWithProviders(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
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

		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Test task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(screen.getByText("All")).toBeInTheDocument();
		expect(screen.getByText("Active")).toBeInTheDocument();
		expect(screen.getByText("Completed")).toBeInTheDocument();
	});

	it("adds a new todo when submitting the form", () => {
		renderWithTheme(<Todo />);

		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Test task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(screen.getByText("Test task")).toBeInTheDocument();
	});

	it("toggles todo completion status", async () => {
		renderWithTheme(<Todo />);

		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Toggle task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();

		fireEvent.click(checkbox);

		const checkedCheckbox = screen.getByRole("checkbox");
		expect(checkedCheckbox).toBeChecked();
	});

	it("deletes a todo when clicking the delete button", () => {
		renderWithTheme(<Todo />);

		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Delete task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(screen.getByText("Delete task")).toBeInTheDocument();

		const listItem = screen.getByText("Delete task").closest("li");
		if (listItem) {
			fireEvent.mouseEnter(listItem);
		}

		const deleteButtons = screen.getAllByRole("button");

		const deleteButton = deleteButtons[deleteButtons.length - 1];
		fireEvent.click(deleteButton);

		expect(screen.queryByText("Delete task")).not.toBeInTheDocument();
	});

	it("filters todos correctly", () => {
		renderWithTheme(<Todo />);

		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.keyDown(input, { key: "Enter" });

		const checkboxes = screen.getAllByRole("checkbox");
		fireEvent.click(checkboxes[1]);

		fireEvent.click(screen.getByText("Active"));

		expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
		expect(screen.getByText("Task 2")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Completed"));

		expect(screen.getByText("Task 1")).toBeInTheDocument();
		expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
	});

	it("shows count of active items", () => {
		renderWithTheme(<Todo />);

		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(screen.getByText("2 items left")).toBeInTheDocument();

		const checkbox = screen.getAllByRole("checkbox")[0];
		fireEvent.click(checkbox);

		expect(screen.getByText("1 item left")).toBeInTheDocument();
	});

	it("clears completed todos", () => {
		renderWithTheme(<Todo />);

		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.keyDown(input, { key: "Enter" });

		const checkbox = screen.getAllByRole("checkbox")[1];
		fireEvent.click(checkbox);

		const clearButton = screen.getByText("Clear completed");
		fireEvent.click(clearButton);

		expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
		expect(screen.getByText("Task 2")).toBeInTheDocument();
	});

	it("toggles all todos when clicking the down arrow button", () => {
		renderWithTheme(<Todo />);

		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.keyDown(input, { key: "Enter" });

		const initialCheckboxes = screen.getAllByRole("checkbox");
		initialCheckboxes.forEach((cb) => expect(cb).not.toBeChecked());

		const toggleAllButton = screen.getByRole("button", {
			name: "toggle all todos",
		});

		fireEvent.click(toggleAllButton);

		const checkboxes = screen.getAllByRole("checkbox");
		checkboxes.forEach((checkbox) => {
			expect(checkbox).toBeChecked();
		});

		fireEvent.click(toggleAllButton);

		const updatedCheckboxes = screen.getAllByRole("checkbox");
		updatedCheckboxes.forEach((checkbox) => {
			expect(checkbox).not.toBeChecked();
		});
	});

	it("saves todos to localStorage", () => {
		vi.clearAllMocks();
		renderWithTheme(<Todo />);

		expect(localStorageMock.getItem).toHaveBeenCalledWith("todos");

		vi.clearAllMocks();

		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Saved task" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			"todos",
			expect.any(String)
		);

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

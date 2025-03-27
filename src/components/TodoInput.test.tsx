import { screen, fireEvent } from "@testing-library/react";
import TodoInput from "./TodoInput";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { renderWithProviders } from "../__tests__/testUtils";

describe("TodoInput компонент", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("рендерит текстовое поле с правильным плейсхолдером", () => {
		renderWithProviders(<TodoInput />);
		expect(
			screen.getByPlaceholderText("What needs to be done?")
		).toBeInTheDocument();
	});

	it("обновляет значение при вводе текста", () => {
		renderWithProviders(<TodoInput />);
		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Новая задача" } });
		expect(input).toHaveValue("Новая задача");
	});

	it("вызывает addTodo при нажатии Enter с непустым значением", () => {
		renderWithProviders(<TodoInput />);
		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Новая задача" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(input).toHaveValue("");
	});
});

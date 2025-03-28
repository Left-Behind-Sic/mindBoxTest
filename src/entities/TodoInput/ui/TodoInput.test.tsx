import { screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { componentRender } from "../../../shared/lib/tests/componentRender/componentRender";
import { TodoInput } from "./TodoInput";

describe("TodoInput компонент", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("рендерит текстовое поле с правильным плейсхолдером", () => {
		componentRender(<TodoInput />);
		expect(
			screen.getByPlaceholderText("What needs to be done?")
		).toBeInTheDocument();
	});

	it("обновляет значение при вводе текста", () => {
		componentRender(<TodoInput />);
		const input = screen.getByPlaceholderText("What needs to be done?");
		fireEvent.change(input, { target: { value: "Новая задача" } });
		expect(input).toHaveValue("Новая задача");
	});

	it("вызывает addTodo при нажатии Enter с непустым значением", () => {
		componentRender(<TodoInput />);
		const input = screen.getByPlaceholderText("What needs to be done?");

		fireEvent.change(input, { target: { value: "Новая задача" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(input).toHaveValue("");
	});
});

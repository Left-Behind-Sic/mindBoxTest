import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { InputForm } from "./InputForm";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

vi.mock("./InputForm", () => ({
	InputForm: () => <div data-testid="todo-input">InputForm</div>,
}));

const render = () => componentRender(<InputForm />);

describe("TodoForm компонент", () => {
	it("рендерит TodoInput", () => {
		render();
		expect(screen.getByTestId("todo-input")).toBeInTheDocument();
	});
});

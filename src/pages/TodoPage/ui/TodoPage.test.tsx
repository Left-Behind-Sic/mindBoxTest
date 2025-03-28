import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { TodoPage } from "./TodoPage";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

vi.mock("../../../widgets/InputForm", () => ({
	InputForm: () => <div data-testid="todo-form">TodoForm</div>,
}));

vi.mock("../../../widgets/TodoList", () => ({
	TodoList: () => <div data-testid="todo-list">TodoList</div>,
}));

vi.mock("../../../widgets/Footer", () => ({
	Footer: () => <div data-testid="footer">Footer</div>,
}));

const render = () => componentRender(<TodoPage />);

describe("Todo компонент", () => {
	it("рендерит заголовок", () => {
		render();
		expect(screen.getByText("todos")).toBeInTheDocument();
	});

	it("рендерит все необходимые дочерние компоненты", () => {
		render();
		expect(screen.getByTestId("todo-form")).toBeInTheDocument();
		expect(screen.getByTestId("todo-list")).toBeInTheDocument();
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});
});

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TodoInputButton } from "./TodoInputButton";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

const render = () => componentRender(<TodoInputButton />);

describe("TodoInputButton компонент", () => {
	it("рендерит кнопку с иконкой", () => {
		render();
		const iconButton = screen.getByRole("button");
		expect(iconButton).toBeInTheDocument();
	});
});

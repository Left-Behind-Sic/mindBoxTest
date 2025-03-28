import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ItemsLeftCounter } from "./ItemsLeftCounter";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

describe("ItemLeftCounter компонент", () => {
	it("отображает количество оставшихся задач", () => {
		componentRender(<ItemsLeftCounter />);

		expect(screen.getByText(/\d+ items? left/)).toBeInTheDocument();
	});
});

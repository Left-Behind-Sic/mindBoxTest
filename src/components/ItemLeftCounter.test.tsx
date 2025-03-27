import { screen } from "@testing-library/react";
import ItemLeftCounter from "./ItemLeftCounter";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../__tests__/testUtils";

describe("ItemLeftCounter компонент", () => {
	it("отображает количество оставшихся задач", () => {
		renderWithProviders(<ItemLeftCounter />);

		expect(screen.getByText(/\d+ items? left/)).toBeInTheDocument();
	});
});

import ClearCompletedButton from "./ClearCompletedButton";
import { vi, describe, it, beforeEach } from "vitest";
import { renderWithProviders } from "../__tests__/testUtils";

describe("ClearCompletedButton компонент", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("рендерится в DOM при использовании провайдеров", () => {
		renderWithProviders(<ClearCompletedButton />);
	});
});

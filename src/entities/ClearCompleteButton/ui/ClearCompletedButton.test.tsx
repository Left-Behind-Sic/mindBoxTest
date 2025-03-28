import { vi, describe, it, beforeEach } from "vitest";
import { ClearCompletedButton } from "./ClearCompletedButton";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

describe("ClearCompletedButton компонент", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("рендерится в DOM при использовании провайдеров", () => {
		componentRender(<ClearCompletedButton />);
	});
});

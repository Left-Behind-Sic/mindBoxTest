/// <reference types="vite/client" />

import "@testing-library/jest-dom";

declare global {
	namespace Vi {
		interface AsymmetricMatchersContaining {
			toBeInTheDocument(): void;
			toHaveClass(className: string): void;
		}
		interface ExpectMatchersContaining {
			toBeInTheDocument(): void;
			toHaveClass(className: string): void;
		}
	}
}

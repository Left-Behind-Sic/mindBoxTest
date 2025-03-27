import { useContext } from "react";
import { CompletedContext } from "./CompletedContext";

export const useCompletedContext = () => {
	const context = useContext(CompletedContext);
	if (!context) {
		throw new Error(
			"useCompletedContext must be used within a CompletedProvider"
		);
	}
	return context;
};

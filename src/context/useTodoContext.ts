import { useContext } from "react";
import {
	TodoContext,
	TodoDataContext,
	TodoActionsContext,
} from "./TodoContext";

export const useTodoContext = () => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error("useTodoContext must be used within a TodoProvider");
	}
	return context;
};

export const useTodoData = () => {
	const context = useContext(TodoDataContext);
	if (!context) {
		throw new Error("useTodoData must be used within a TodoProvider");
	}
	return context;
};

export const useTodoActions = () => {
	const context = useContext(TodoActionsContext);
	if (!context) {
		throw new Error("useTodoActions must be used within a TodoProvider");
	}
	return context;
};

import { CompletedContext } from "@/entities/ClearCompleteButton";
import { useTodosContext } from "@/entities/Todo";
import { useCallback, useMemo } from "react";

export const CompletedContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const { todos, setTodos } = useTodosContext();

	const hasCompletedTodos = useMemo(
		() => todos.some((todo) => todo.completed),
		[todos]
	);

	const clearCompleted = useCallback(() => {
		setTodos((prev) => prev.filter((todo) => !todo.completed));
	}, [setTodos]);

	const value = useMemo(
		() => ({
			hasCompletedTodos,
			clearCompleted,
		}),
		[hasCompletedTodos, clearCompleted]
	);

	return (
		<CompletedContext.Provider value={value}>
			{children}
		</CompletedContext.Provider>
	);
};

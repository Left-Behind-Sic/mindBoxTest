import { useMemo, useCallback } from "react";
import { StatsContext } from "./StatsContext";
import { ITodo } from "../types/todo";
import { useTodosContext } from "./useTodosContext";

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { todos, toggleTodo } = useTodosContext();

	const activeCount = useMemo(
		() => todos.filter((todo: ITodo) => !todo.completed).length,
		[todos]
	);

	const hasCompletedTodos = useMemo(
		() => todos.some((todo: ITodo) => todo.completed),
		[todos]
	);

	const clearCompleted = useCallback(() => {
		todos
			.filter((todo: ITodo) => todo.completed)
			.forEach((todo: ITodo) => toggleTodo(todo.id));
	}, [todos, toggleTodo]);

	return (
		<StatsContext.Provider
			value={{
				activeCount,
				hasCompletedTodos,
				clearCompleted,
			}}
		>
			{children}
		</StatsContext.Provider>
	);
};

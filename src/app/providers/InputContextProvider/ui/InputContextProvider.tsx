import { useTodosContext, TodoItemSchema } from "@/entities/Todo";
import { InputContext } from "@/entities/TodoInput";
import { useCallback, useMemo } from "react";

export const InputContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { setTodos } = useTodosContext();

	const addTodo = useCallback(
		(text: string) => {
			const newTodo: TodoItemSchema = {
				id: Date.now().toString(),
				text,
				completed: false,
			};
			setTodos((prev) => [...prev, newTodo]);
		},
		[setTodos]
	);

	const value = useMemo(
		() => ({
			addTodo,
		}),
		[addTodo]
	);

	return (
		<InputContext.Provider value={value}>{children}</InputContext.Provider>
	);
};

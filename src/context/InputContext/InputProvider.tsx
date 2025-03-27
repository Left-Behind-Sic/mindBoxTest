import { useCallback, useMemo } from "react";
import { useTodosContext } from "../TodosContext/useTodosContext";
import { InputContext } from "./InputContext";
import { ITodo } from "../../types/todo";

export const InputProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { setTodos } = useTodosContext();

	const addTodo = useCallback(
		(text: string) => {
			const newTodo: ITodo = {
				id: Date.now().toString(),
				text,
				completed: false,
			};
			setTodos((prev) => [newTodo, ...prev]);
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

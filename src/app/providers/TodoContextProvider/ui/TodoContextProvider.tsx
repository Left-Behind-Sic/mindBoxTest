import { TodoItemSchema, TodosContext } from "@/entities/Todo";
import { useState, useEffect, useCallback, useMemo } from "react";

export const TodosContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [todos, setTodos] = useState<TodoItemSchema[]>(() => {
		const saved = localStorage.getItem("todos");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const toggleTodo = useCallback((id: string) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	}, []);

	const toggleAllTodos = useCallback(() => {
		setTodos((prev) => {
			const allCompleted = prev.every((t) => t.completed);
			return prev.map((t) => ({ ...t, completed: !allCompleted }));
		});
	}, []);

	const deleteTodo = useCallback((id: string) => {
		setTodos((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const value = useMemo(
		() => ({
			todos,
			setTodos,
			toggleTodo,
			toggleAllTodos,
			deleteTodo,
		}),
		[todos, toggleTodo, toggleAllTodos, deleteTodo]
	);
	return (
		<TodosContext.Provider value={value}>{children}</TodosContext.Provider>
	);
};

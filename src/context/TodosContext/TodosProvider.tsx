import { useState, useEffect, useCallback, useMemo } from "react";
import { ITodo } from "../../types/todo";
import { TodosContext } from "./TodosContext";

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [todos, setTodos] = useState<ITodo[]>(() => {
		const saved = localStorage.getItem("todos");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = useCallback((text: string) => {
		const newTodo: ITodo = {
			id: Date.now().toString(),
			text,
			completed: false,
		};
		setTodos((prev) => [newTodo, ...prev]);
	}, []);

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

	const clearCompleted = useCallback(() => {
		setTodos((prev) => prev.filter((t) => !t.completed));
	}, []);

	const value = useMemo(
		() => ({
			todos,
			setTodos,
			addTodo,
			toggleTodo,
			toggleAllTodos,
			deleteTodo,
			clearCompleted,
		}),
		[todos, addTodo, toggleTodo, toggleAllTodos, deleteTodo, clearCompleted]
	);
	return (
		<TodosContext.Provider value={value}>{children}</TodosContext.Provider>
	);
};

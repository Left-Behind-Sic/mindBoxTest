import { useState, useEffect, useCallback } from "react";
import { ITodo } from "../types/todo";
import { TodosContext } from "./TodosContext";

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [todos, setTodos] = useState<ITodo[]>(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			return JSON.parse(savedTodos);
		}
		return [];
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
		setTodos((prevTodos) => [newTodo, ...prevTodos]);
	}, []);

	const toggleTodo = useCallback((id: string) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	}, []);

	const toggleAllTodos = useCallback(() => {
		setTodos((prevTodos) => {
			const allCompleted = prevTodos.every((todo) => todo.completed);
			return prevTodos.map((todo) => ({
				...todo,
				completed: !allCompleted,
			}));
		});
	}, []);

	const deleteTodo = useCallback((id: string) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	}, []);

	return (
		<TodosContext.Provider
			value={{
				todos,
				addTodo,
				toggleTodo,
				toggleAllTodos,
				deleteTodo,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
};

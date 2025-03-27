import { useState, useEffect, useMemo, useCallback } from "react";
import { FilterType } from "../types";
import { ITodo } from "../types/todo";
import { TodoContext } from "./TodoContext";

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [todos, setTodos] = useState<ITodo[]>(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			return JSON.parse(savedTodos);
		}
		return [];
	});

	const [filter, setFilter] = useState<FilterType>("all");

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

	const clearCompleted = useCallback(() => {
		setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
	}, []);

	const filteredTodos = useMemo(() => {
		return todos.filter((todo) => {
			if (filter === "all") return true;
			if (filter === "active") return !todo.completed;
			if (filter === "completed") return todo.completed;
			return true;
		});
	}, [filter, todos]);

	const activeCount = useMemo(
		() => todos.filter((todo) => !todo.completed).length,
		[todos]
	);

	const hasCompletedTodos = useMemo(
		() => todos.some((todo) => todo.completed),
		[todos]
	);

	const allCompleted = useMemo(
		() => todos.length > 0 && todos.every((todo) => todo.completed),
		[todos]
	);

	return (
		<TodoContext.Provider
			value={{
				todos,
				filter,
				addTodo,
				toggleTodo,
				toggleAllTodos,
				deleteTodo,
				clearCompleted,
				setFilter,
				filteredTodos,
				activeCount,
				hasCompletedTodos,
				allCompleted,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

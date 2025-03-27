import { useState, useEffect, useMemo, useCallback } from "react";
import { FilterType } from "../types";
import { ITodo } from "../types/todo";
import {
	TodoContext,
	TodoDataContext,
	TodoActionsContext,
} from "./TodoContext";

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
		setTodos((prevTodos) => {
			const newTodos = [...prevTodos];
			const todoIndex = newTodos.findIndex((todo) => todo.id === id);
			if (todoIndex !== -1) {
				newTodos[todoIndex] = {
					...newTodos[todoIndex],
					completed: !newTodos[todoIndex].completed,
				};
			}
			return newTodos;
		});
	}, []);

	const allCompleted = useMemo(
		() => todos.length > 0 && todos.every((todo) => todo.completed),
		[todos]
	);

	const toggleAllTodos = useCallback(() => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => ({
				...todo,
				completed: !allCompleted,
			}))
		);
	}, [allCompleted]);

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

	// Мемоизируем функции, чтобы они не пересоздавались при каждом рендере
	const todoActions = useMemo(
		() => ({
			addTodo,
			toggleTodo,
			toggleAllTodos,
			deleteTodo,
			clearCompleted,
			setFilter,
		}),
		[addTodo, toggleTodo, toggleAllTodos, deleteTodo, clearCompleted, setFilter]
	);

	// Мемоизируем данные, чтобы они не пересоздавались при каждом рендере
	const todoData = useMemo(
		() => ({
			todos,
			filter,
			filteredTodos,
			activeCount,
			hasCompletedTodos,
			allCompleted,
		}),
		[todos, filter, filteredTodos, activeCount, hasCompletedTodos, allCompleted]
	);

	// Для обратной совместимости
	const contextValue = useMemo(
		() => ({
			...todoData,
			...todoActions,
		}),
		[todoData, todoActions]
	);

	return (
		<TodoActionsContext.Provider value={todoActions}>
			<TodoDataContext.Provider value={todoData}>
				<TodoContext.Provider value={contextValue}>
					{children}
				</TodoContext.Provider>
			</TodoDataContext.Provider>
		</TodoActionsContext.Provider>
	);
};

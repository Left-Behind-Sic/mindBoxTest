import { Container, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterType, Todo as TodoType } from "../types";
import Footer from "./Footer";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
	const [todos, setTodos] = useState<TodoType[]>(() => {
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

	const addTodo = useCallback(
		(text: string) => {
			const newTodo: TodoType = {
				id: Date.now().toString(),
				text,
				completed: false,
			};
			setTodos([newTodo, ...todos]);
		},
		[todos]
	);

	const toggleTodo = useCallback(
		(id: string) => {
			setTodos(
				todos.map((todo) =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo
				)
			);
		},
		[todos]
	);

	const toggleAllTodos = useCallback(() => {
		const allCompleted = todos.every((todo) => todo.completed);
		setTodos(
			todos.map((todo) => ({
				...todo,
				completed: !allCompleted,
			}))
		);
	}, [todos]);

	const deleteTodo = useCallback(
		(id: string) => {
			setTodos(todos.filter((todo) => todo.id !== id));
		},
		[todos]
	);

	const clearCompleted = useCallback(() => {
		setTodos(todos.filter((todo) => !todo.completed));
	}, [todos]);

	const activeCount = useMemo(
		() => todos.filter((todo) => !todo.completed).length,
		[todos]
	);

	const filteredTodos = useMemo(
		() =>
			todos.filter((todo) => {
				if (filter === "all") return true;
				if (filter === "active") return !todo.completed;
				if (filter === "completed") return todo.completed;
				return true;
			}),
		[filter, todos]
	);

	const isVisibleClearButton = useMemo(
		() => todos.some((todo) => todo.completed),
		[todos]
	);

	return (
		<Container maxWidth="lg" sx={{ py: 5, minWidth: 500 }}>
			<Typography
				variant="h4"
				component="h1"
				sx={{
					textAlign: "center",
					mb: 3,
				}}
			>
				todos
			</Typography>
			<Paper
				sx={{
					width: "100%",
					borderRadius: 0,
				}}
			>
				<TodoForm
					addTodo={addTodo}
					toggleAllTodos={toggleAllTodos}
					allCompleted={
						todos.length > 0 && todos.every((todo) => todo.completed)
					}
				/>
				<TodoList
					todos={filteredTodos}
					toggleTodo={toggleTodo}
					deleteTodo={deleteTodo}
				/>
				<Footer
					activeCount={activeCount}
					filter={filter}
					clearCompleted={clearCompleted}
					setFilter={setFilter}
					isVisibleClearButton={isVisibleClearButton}
				/>
			</Paper>
		</Container>
	);
};

export default Todo;

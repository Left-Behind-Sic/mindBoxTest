import { Box, List, Typography } from "@mui/material";
import TodoItem from "./TodoItem";
import { useTodosContext } from "../context/TodosContext/useTodosContext";
import { useFilterContext } from "../context/FilterContext/useFilterContext";
import { useMemo } from "react";
import { ITodo } from "../types/todo";

const TodoList = () => {
	const { todos, toggleTodo, deleteTodo } = useTodosContext();
	const { filter } = useFilterContext();

	const filteredTodos = useMemo(() => {
		return todos.filter((todo: ITodo) => {
			if (filter === "all") return true;
			if (filter === "active") return !todo.completed;
			if (filter === "completed") return todo.completed;
			return true;
		});
	}, [filter, todos]);

	return (
		<List
			sx={{
				padding: 0,
				margin: 0,
				height: "60vh",
				overflow: "auto",
			}}
		>
			{filteredTodos.length === 0 ? (
				<Box
					sx={{
						width: "100%",
						height: "60vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						sx={{
							fontSize: 24,
							fontWeight: 300,
							color: "text.disabled",
							textAlign: "center",
						}}
					>
						empty
					</Typography>
				</Box>
			) : (
				filteredTodos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						toggleTodo={toggleTodo}
						deleteTodo={deleteTodo}
					/>
				))
			)}
		</List>
	);
};

export default TodoList;

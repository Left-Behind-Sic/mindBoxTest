import { useFilterContext } from "@/entities/Filter";
import { useTodosContext, TodoItemSchema } from "@/entities/Todo";
import { TodoListItem } from "@/features/TodoListItem";
import { Box, List, Typography } from "@mui/material";
import { useMemo } from "react";

export const TodoList = () => {
	const { todos, toggleTodo, deleteTodo } = useTodosContext();
	const { filter } = useFilterContext();

	const filteredTodos = useMemo(() => {
		return todos.filter((todo: TodoItemSchema) => {
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
			}}>
			{filteredTodos.length === 0 ? (
				<Box
					sx={{
						width: "100%",
						height: "60vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Typography
						sx={{
							fontSize: 24,
							fontWeight: 300,
							color: "text.disabled",
							textAlign: "center",
						}}>
						empty
					</Typography>
				</Box>
			) : (
				filteredTodos.map((todo) => (
					<TodoListItem
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

import { memo } from "react";
import { Todo } from "../types";
import TodoItem from "./TodoItem";
import { Box, List, Typography } from "@mui/material";

interface TodoListProps {
	todos: Todo[];
	toggleTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
}

const TodoList = ({ todos, toggleTodo, deleteTodo }: TodoListProps) => {
	return (
		<List
			sx={{
				padding: 0,
				margin: 0,
				height: "60vh",
				overflow: "auto",
			}}
		>
			{todos.length === 0 ? (
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
				todos.map((todo) => (
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

export default memo(TodoList);

import { Box, List, Typography } from "@mui/material";
import { useTodoData, useTodoActions } from "../context/useTodoContext";
import TodoItem from "./TodoItem";
import { memo } from "react";

const TodoList = () => {
	const { filteredTodos } = useTodoData();
	const { toggleTodo, deleteTodo } = useTodoActions();

	console.log("TodoList render");

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

export default memo(TodoList);

import { useTodosContext, TodoItemSchema } from "@/entities/Todo";
import { Typography } from "@mui/material";
import { useMemo } from "react";

export const ItemsLeftCounter = () => {
	const { todos } = useTodosContext();

	const activeCount = useMemo(
		() => todos.filter((todo: TodoItemSchema) => !todo.completed).length,
		[todos]
	);

	return (
		<Typography
			display="inline-flex"
			variant="body2"
			color="text.secondary"
			align="center"
			sx={{
				justifyContent: "flex-start",
				width: "100%",
				lineHeight: 1,
				py: 0,
			}}>
			{activeCount} {activeCount === 1 ? "item" : "items"} left
		</Typography>
	);
};

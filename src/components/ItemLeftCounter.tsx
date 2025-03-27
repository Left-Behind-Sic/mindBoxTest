import { Typography } from "@mui/material";
import { useMemo } from "react";
import { useTodosContext } from "../context/TodosContext/useTodosContext";
import { ITodo } from "../types/todo";

const ItemLeftCounter = () => {
	const { todos } = useTodosContext();

	const activeCount = useMemo(
		() => todos.filter((todo: ITodo) => !todo.completed).length,
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
			}}
		>
			{activeCount} {activeCount === 1 ? "item" : "items"} left
		</Typography>
	);
};

export default ItemLeftCounter;

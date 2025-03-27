import { Button } from "@mui/material";
import { memo } from "react";
import { useCompletedContext } from "../context/CompletedContext/useCompletedContext";

const ClearCompletedButton = memo(() => {
	const { hasCompletedTodos, clearCompleted } = useCompletedContext();

	if (!hasCompletedTodos) {
		return null;
	}

	return (
		<Button
			sx={{
				lineHeight: 1,
				py: 0,
				color: "text.secondary",
				justifyContent: "flex-end",
				width: "100%",
				"&:hover": {
					textDecoration: "underline",
					backgroundColor: "transparent",
				},
			}}
			onClick={clearCompleted}
		>
			Clear completed
		</Button>
	);
});

export default ClearCompletedButton;

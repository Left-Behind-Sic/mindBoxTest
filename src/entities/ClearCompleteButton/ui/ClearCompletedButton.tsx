import { Button } from "@mui/material";
import { useCompletedContext } from "../model/hooks/useCompletedContext";

export const ClearCompletedButton = () => {
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
			onClick={clearCompleted}>
			Clear completed
		</Button>
	);
};

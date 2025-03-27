import { Button } from "@mui/material";
import { useTodoContext } from "../context/useTodoContext";

const ClearCompletedButton = () => {
	const { clearCompleted, hasCompletedTodos } = useTodoContext();
	if (hasCompletedTodos) {
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
	}
};

export default ClearCompletedButton;

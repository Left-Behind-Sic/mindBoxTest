import { useTodosContext } from "@/entities/Todo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, IconButton } from "@mui/material";

export const TodoInputButton = () => {
	const { toggleAllTodos } = useTodosContext();
	return (
		<Box width={60} display="flex" justifyContent="center">
			<IconButton
				sx={{
					color: "text.disabled",
				}}
				size="small"
				onClick={toggleAllTodos}
				aria-label="toggle all todos">
				<KeyboardArrowDownIcon />
			</IconButton>
		</Box>
	);
};

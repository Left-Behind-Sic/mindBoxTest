import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, IconButton } from "@mui/material";
import TodoInput from "./TodoInput";
import { useTodosContext } from "../context/TodosContext/useTodosContext";

const TodoForm = () => {
	const { toggleAllTodos } = useTodosContext();

	return (
		<Box
			component="form"
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				borderBottom: "1px solid #ededed",
			}}
		>
			<Box width={60} display="flex" justifyContent="center">
				<IconButton
					sx={{
						color: "text.disabled",
					}}
					size="small"
					onClick={toggleAllTodos}
					aria-label="toggle all todos"
				>
					<KeyboardArrowDownIcon />
				</IconButton>
			</Box>
			<TodoInput />
		</Box>
	);
};

export default TodoForm;

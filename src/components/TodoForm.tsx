import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, IconButton } from "@mui/material";
import TodoInput from "./TodoInput";

const TodoForm = () => {
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
				>
					<KeyboardArrowDownIcon />
				</IconButton>
			</Box>
			<TodoInput />
		</Box>
	);
};

export default TodoForm;

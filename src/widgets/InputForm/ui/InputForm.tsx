import { Box } from "@mui/material";
import { TodoInput } from "../../../entities/TodoInput";
import { TodoInputButton } from "../../../features/TodoInputButton";

export const InputForm = () => {
	return (
		<Box
			component="form"
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				borderBottom: "1px solid #ededed",
			}}>
			<TodoInputButton />
			<TodoInput />
		</Box>
	);
};

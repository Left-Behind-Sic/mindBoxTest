import { memo, useState } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface TodoFormProps {
	addTodo: (text: string) => void;
	toggleAllTodos: () => void;
	allCompleted: boolean;
}

const TodoForm = ({ addTodo, toggleAllTodos, allCompleted }: TodoFormProps) => {
	const [text, setText] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (text.trim()) {
			addTodo(text.trim());
			setText("");
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				borderBottom: "1px solid #ededed",
			}}
		>
			<Box width={60} display="flex" justifyContent="center">
				<IconButton
					onClick={toggleAllTodos}
					sx={{
						// height: 53,
						// width: 53,
						color: allCompleted ? "primary.main" : "text.disabled",
					}}
					size="small"
				>
					<KeyboardArrowDownIcon />
				</IconButton>
			</Box>
			<TextField
				fullWidth
				variant="standard"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="What needs to be done?"
				sx={{
					"& .MuiInputBase-root": {
						// pl: 6,
						py: 1.5,
					},
					"& .MuiInput-underline:before, & .MuiInput-underline:after": {
						border: "none",
					},
					"& input": {
						fontSize: 24,
						fontWeight: 300,
						color: "text.primary",
						caretColor: "text.primary",
						// padding: "16px 16px 16px 0",
						fontStyle: "italic",
						"&::placeholder": {
							color: "text.disabled",
							opacity: 0.3,
						},
					},
				}}
				slotProps={{
					input: {
						disableUnderline: true,
					},
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSubmit(e);
					}
				}}
			/>
		</Box>
	);
};

export default memo(TodoForm);

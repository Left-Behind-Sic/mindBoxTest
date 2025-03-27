import { Todo } from "../types";
import { ListItem, Checkbox, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface TodoItemProps {
	todo: Todo;
	toggleTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo }: TodoItemProps) => {
	const [showDelete, setShowDelete] = useState(false);

	return (
		<ListItem
			sx={{
				padding: 0,
				borderBottom: "1px solid #ededed",
				position: "relative",
				"&:hover .delete-button": {
					opacity: 1,
				},
			}}
			onMouseEnter={() => setShowDelete(true)}
			onMouseLeave={() => setShowDelete(false)}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					width: "100%",
					justifyContent: "space-between",

					py: 1,
				}}
			>
				<Box display="flex" alignItems="center">
					<Checkbox
						checked={todo.completed}
						onChange={() => toggleTodo(todo.id)}
						size="large"
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<CheckCircleOutlineIcon />}
						sx={{
							color: "#ededed",
							"&.Mui-checked": {
								color: "#A1D3C8",
							},
						}}
					/>
					<Typography
						sx={{
							width: "100%",
							fontSize: 24,
							fontWeight: 300,
							lineHeight: 1,
							py: 1,
							maxWidth: "100%",
							wordBreak: "break-word",
							textDecoration: todo.completed ? "line-through" : undefined,
							color: todo.completed ? "text.disabled" : "text.primary",
						}}
					>
						{todo.text}
					</Typography>
				</Box>

				<IconButton
					className="delete-button"
					onClick={() => deleteTodo(todo.id)}
					size="small"
					sx={{
						color: "primary.main",
						opacity: showDelete ? 1 : 0,
						transition: "opacity 0.2s",
						marginLeft: 1,
						"&:hover": {
							color: "#af5b5e",
						},
					}}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Box>
		</ListItem>
	);
};

export default memo(TodoItem);

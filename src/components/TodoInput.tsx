import { TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useInputContext } from "../context/InputContext/useInputContext";

const TodoInput = () => {
	const [text, setText] = useState("");
	const { addTodo } = useInputContext();

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			if (text.trim()) {
				addTodo(text.trim());
				setText("");
			}
		},
		[addTodo, text]
	);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key === "Enter") {
				handleSubmit(e);
			}
		},
		[handleSubmit]
	);

	const onChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	}, []);

	return (
		<TextField
			fullWidth
			variant="standard"
			value={text}
			onChange={onChangeText}
			placeholder="What needs to be done?"
			sx={{
				"& .MuiInputBase-root": {
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
			onKeyDown={onKeyDown}
		/>
	);
};

export default TodoInput;

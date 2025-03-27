import { Box, Typography, Button } from "@mui/material";
import TodoFilter from "./TodoFilter";
import { memo } from "react";
import { FilterType } from "../types";

interface FooterProps {
	activeCount: number;
	isVisibleClearButton: boolean;
	clearCompleted: () => void;
	filter: FilterType;
	setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

const Footer = ({
	activeCount,
	clearCompleted,
	isVisibleClearButton,
	filter,
	setFilter,
}: FooterProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				px: 2,
				py: 1,
				borderTop: "1px solid #ededed",
				color: "text.secondary",
				fontSize: "14px",
				position: "relative",
			}}
		>
			<Typography variant="body2" color="text.secondary">
				{activeCount} {activeCount === 1 ? "item" : "items"} left
			</Typography>
			<TodoFilter filter={filter} setFilter={setFilter} />
			{isVisibleClearButton && (
				<Button
					sx={{
						textTransform: "none",
						lineHeight: 1.2,
						py: 0,
						color: "text.secondary",
						"&:hover": {
							textDecoration: "underline",
							backgroundColor: "transparent",
						},
					}}
					onClick={clearCompleted}
				>
					Clear completed
				</Button>
			)}
		</Box>
	);
};

export default memo(Footer);

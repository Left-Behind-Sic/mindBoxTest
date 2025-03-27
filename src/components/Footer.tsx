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
				display: "grid",
				justifyContent: "space-between",
				gridTemplateColumns: "1fr 1fr 1fr",
				alignItems: "center",
				gap: 1,
				px: 1,
				py: 1,
				borderTop: "1px solid #ededed",
				color: "text.secondary",
				fontSize: "14px",
				position: "relative",
			}}
		>
			<Typography
				display="inline-flex"
				variant="body2"
				color="text.secondary"
				// lineHeight={1}
				align="center"
				sx={{
					// wordBreak: "break-word",
					justifyContent: "flex-start",
					width: "100%",
					lineHeight: 1,
					py: 0,
				}}
			>
				{activeCount} {activeCount === 1 ? "item" : "items"} left
			</Typography>
			<TodoFilter filter={filter} setFilter={setFilter} />
			{isVisibleClearButton && (
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
			)}
		</Box>
	);
};

export default memo(Footer);

import { Box } from "@mui/material";
import { ClearCompletedButton } from "@/entities/ClearCompleteButton";
import { ItemsLeftCounter } from "@/features/ItemsLeftCounter";
import { TodoFilterButtons } from "@/features/TodoFilterButtons";

export const Footer = () => {
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
			}}>
			<ItemsLeftCounter />
			<TodoFilterButtons />
			<ClearCompletedButton />
		</Box>
	);
};

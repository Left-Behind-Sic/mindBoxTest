import { Box } from "@mui/material";
import ClearCompletedButton from "./ClearCompletedButton";
import ItemLeftCounter from "./ItemLeftCounter";
import TodoFilter from "./TodoFilter";

const Footer = () => {
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
			<ItemLeftCounter />
			<TodoFilter />
			<ClearCompletedButton />
		</Box>
	);
};

export default Footer;

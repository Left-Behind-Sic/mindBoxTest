import { Typography } from "@mui/material";
import { useTodoContext } from "../context/useTodoContext";

const ItemLeftCounter = () => {
	const { activeCount } = useTodoContext();
	return (
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
	);
};

export default ItemLeftCounter;

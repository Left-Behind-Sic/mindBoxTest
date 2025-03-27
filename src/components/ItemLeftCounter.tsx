import { Typography } from "@mui/material";
import { useStatsContext } from "../context/useStatsContext";
import { memo } from "react";

const ItemLeftCounter = memo(() => {
	const { activeCount } = useStatsContext();
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
});

export default ItemLeftCounter;

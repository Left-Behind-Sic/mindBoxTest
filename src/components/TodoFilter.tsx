import { FilterType } from "../types";
import { Box, Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ selected }: { selected: boolean }) => ({
	minWidth: "auto",
	border: selected ? "1px solid #EDDADA" : "1px solid transparent",
	padding: "2px 7px",
	fontSize: 14,
	"&:hover": {
		border: "1px solid #EDDADA",
	},
}));

interface TodoFilterProps {
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
}

const TodoFilter = ({ filter, setFilter }: TodoFilterProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				gap: 0.5,
				justifyContent: "center",
				// position: "absolute",
				// left: "50%",
				// transform: "translateX(-50%)",
			}}
		>
			<StyledButton
				size="small"
				variant="text"
				onClick={() => setFilter("all")}
				selected={filter === "all"}
			>
				All
			</StyledButton>
			<StyledButton
				size="small"
				variant="text"
				onClick={() => setFilter("active")}
				selected={filter === "active"}
			>
				Active
			</StyledButton>
			<StyledButton
				size="small"
				variant="text"
				onClick={() => setFilter("completed")}
				selected={filter === "completed"}
			>
				Completed
			</StyledButton>
		</Box>
	);
};

export default TodoFilter;

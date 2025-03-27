import { FilterType } from "../types";
import { Box, Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ filter }: { filter: boolean }) => ({
	minWidth: "auto",
	border: filter ? "1px solid #EDDADA" : "1px solid transparent",
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
				position: "absolute",
				left: "50%",
				transform: "translateX(-50%)",
			}}
		>
			<StyledButton
				size="small"
				variant="text"
				onClick={() => setFilter("all")}
				filter={filter === "all"}
			>
				All
			</StyledButton>
			<StyledButton
				size="small"
				variant="text"
				onClick={() => setFilter("active")}
				filter={filter === "active"}
			>
				Active
			</StyledButton>
			<StyledButton
				size="small"
				variant="text"
				onClick={() => setFilter("completed")}
				filter={filter === "completed"}
			>
				Completed
			</StyledButton>
		</Box>
	);
};

export default TodoFilter;

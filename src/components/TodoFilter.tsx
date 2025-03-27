import { Box, Button, styled } from "@mui/material";
import { memo, useCallback } from "react";
import { useFilterContext } from "../context/FilterContext/useFilterContext";

const StyledButton = styled(Button)(({ selected }: { selected: boolean }) => ({
	minWidth: "auto",
	border: selected ? "1px solid #EDDADA" : "1px solid transparent",
	padding: "2px 7px",
	fontSize: 14,
	"&:hover": {
		border: "1px solid #EDDADA",
	},
}));

const TodoFilter = memo(() => {
	const { filter, setFilter } = useFilterContext();
	// Мемоизируем обработчики нажатий на кнопки фильтра
	const setAllFilter = useCallback(() => setFilter("all"), [setFilter]);
	const setActiveFilter = useCallback(() => setFilter("active"), [setFilter]);
	const setCompletedFilter = useCallback(
		() => setFilter("completed"),
		[setFilter]
	);

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
				onClick={setAllFilter}
				selected={filter === "all"}
			>
				All
			</StyledButton>
			<StyledButton
				size="small"
				variant="text"
				onClick={setActiveFilter}
				selected={filter === "active"}
			>
				Active
			</StyledButton>
			<StyledButton
				size="small"
				variant="text"
				onClick={setCompletedFilter}
				selected={filter === "completed"}
			>
				Completed
			</StyledButton>
		</Box>
	);
});

export default TodoFilter;

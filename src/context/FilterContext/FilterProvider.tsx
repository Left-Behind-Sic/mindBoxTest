import { useState, useMemo } from "react";
import { FilterType } from "../../types";
import { FilterContext } from "./FilterContext";

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [filter, setFilter] = useState<FilterType>("all");

	const value = useMemo(
		() => ({
			filter,
			setFilter,
		}),
		[filter, setFilter]
	);

	return (
		<FilterContext.Provider value={value}>{children}</FilterContext.Provider>
	);
};

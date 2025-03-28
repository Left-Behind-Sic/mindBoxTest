import { FilterContext, FilterType } from "@/entities/Filter";
import { useState, useMemo } from "react";

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
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

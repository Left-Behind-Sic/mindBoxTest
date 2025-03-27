import { useState } from "react";
import { FilterType } from "../../types";
import { FilterContext } from "./FilterContext";

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [filter, setFilter] = useState<FilterType>("all");

	return (
		<FilterContext.Provider
			value={{
				filter,
				setFilter,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};

import React from "react";
import { FilterType } from "../../types";

export interface FilterContextType {
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
}

export const FilterContext = React.createContext<FilterContextType | null>(
	null
);

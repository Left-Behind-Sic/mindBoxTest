import { FilterType } from "./FilterType";

export interface FilterContextSchema {
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
}

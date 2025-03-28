import { createContext } from "react";
import { FilterContextSchema } from "../types/FilterContextSchema";

export const FilterContext = createContext<FilterContextSchema | null>(null);

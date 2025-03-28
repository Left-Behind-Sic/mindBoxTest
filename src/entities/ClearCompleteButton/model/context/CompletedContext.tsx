import { createContext } from "react";
import { CompletedContextSchema } from "../types/CompletedContextSchema";

export const CompletedContext = createContext<CompletedContextSchema | null>(
	null
);

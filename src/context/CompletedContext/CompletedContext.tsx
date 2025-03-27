import React from "react";

export interface CompletedContextType {
	hasCompletedTodos: boolean;
	clearCompleted: () => void;
}

export const CompletedContext =
	React.createContext<CompletedContextType | null>(null);

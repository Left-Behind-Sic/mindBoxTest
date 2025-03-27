import React from "react";

export interface StatsContextType {
	activeCount: number;
	hasCompletedTodos: boolean;
	clearCompleted: () => void;
}

export const StatsContext = React.createContext<StatsContextType | null>(null);

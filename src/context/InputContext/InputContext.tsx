import React from "react";

export interface InputContextType {
	addTodo: (text: string) => void;
}

export const InputContext = React.createContext<InputContextType | null>(null);

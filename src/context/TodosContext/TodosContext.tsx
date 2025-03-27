import React from "react";
import { ITodo } from "../../types/todo";

export interface TodosContextType {
	todos: ITodo[];
	setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
	addTodo: (text: string) => void;
	toggleTodo: (id: string) => void;
	toggleAllTodos: () => void;
	deleteTodo: (id: string) => void;
	clearCompleted: () => void;
}

export const TodosContext = React.createContext<TodosContextType | null>(null);

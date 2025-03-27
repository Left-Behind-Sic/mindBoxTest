import { FilterType } from "../types";

export interface ITodo {
	id: string;
	text: string;
	completed: boolean;
}

export type TodoContextType = {
	todos: ITodo[];
	filter: FilterType;
	addTodo: (text: string) => void;
	toggleTodo: (id: string) => void;
	toggleAllTodos: () => void;
	deleteTodo: (id: string) => void;
	clearCompleted: () => void;
	setFilter: (filter: FilterType) => void;
	filteredTodos: ITodo[];
	activeCount: number;
	hasCompletedTodos: boolean;
	allCompleted: boolean;
};

export type FilterContextType = {
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
};

export type TodoUtilsContextType = {
	filteredTodos: ITodo[];
	activeCount: number;
	hasCompletedTodos: boolean;
	allCompleted: boolean;
};

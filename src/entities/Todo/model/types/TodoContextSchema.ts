import { TodoItemSchema } from "./TodoItemSchema";

export interface TodoContextSchema {
	todos: TodoItemSchema[];
	setTodos: React.Dispatch<React.SetStateAction<TodoItemSchema[]>>;
	addTodo: (text: string) => void;
	toggleTodo: (id: string) => void;
	toggleAllTodos: () => void;
	deleteTodo: (id: string) => void;
	clearCompleted: () => void;
}

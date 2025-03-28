import { TodoItemSchema } from "./TodoItemSchema";

export interface TodoContextSchema {
	todos: TodoItemSchema[];
	setTodos: React.Dispatch<React.SetStateAction<TodoItemSchema[]>>;
	toggleTodo: (id: string) => void;
	toggleAllTodos: () => void;
	deleteTodo: (id: string) => void;
}

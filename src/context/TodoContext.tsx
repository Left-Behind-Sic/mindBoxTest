import React from "react";
import {
	TodoContextType,
	TodoActionsContextType,
	TodoDataContextType,
} from "../types/todo";

// Контекст для данных
export const TodoDataContext = React.createContext<TodoDataContextType | null>(
	null
);

// Контекст для действий
export const TodoActionsContext =
	React.createContext<TodoActionsContextType | null>(null);

// Сохраняем старый контекст для обратной совместимости
export const TodoContext = React.createContext<TodoContextType | null>(null);

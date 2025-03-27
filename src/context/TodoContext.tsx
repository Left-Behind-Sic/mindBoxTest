import React from "react";
import { TodoContextType } from "../types/todo";

export const TodoContext = React.createContext<TodoContextType | null>(null);

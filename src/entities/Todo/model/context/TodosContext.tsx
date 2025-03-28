import React from "react";
import { TodoContextSchema } from "../types/TodoContextSchema";

export const TodosContext = React.createContext<TodoContextSchema | null>(null);

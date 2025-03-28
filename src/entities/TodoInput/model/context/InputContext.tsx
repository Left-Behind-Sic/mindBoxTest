import React from "react";
import { InputContextSchema } from "../..";

export const InputContext = React.createContext<InputContextSchema | null>(
	null
);

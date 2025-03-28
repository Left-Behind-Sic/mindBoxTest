import { lightTheme } from "@/app/styles/themes/lightTheme";
import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

interface ThemeProviderComponentProps {
	children?: ReactNode;
}

export const ThemeProviderComponent = ({
	children,
}: ThemeProviderComponentProps) => {
	return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

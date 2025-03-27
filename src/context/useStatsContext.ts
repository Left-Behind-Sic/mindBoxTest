import { useContext } from "react";
import { StatsContext } from "./StatsContext";

export const useStatsContext = () => {
	const context = useContext(StatsContext);
	if (!context) {
		throw new Error("useStatsContext must be used within a StatsProvider");
	}
	return context;
};

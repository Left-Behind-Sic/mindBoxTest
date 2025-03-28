import { Footer } from "@/widgets/Footer";
import { InputForm } from "@/widgets/InputForm";
import { TodoList } from "@/widgets/TodoList";
import { Container, Paper, Typography } from "@mui/material";

export const TodoPage = () => {
	return (
		<Container maxWidth="md" sx={{ width: "100%", m: 0, p: 1 }}>
			<Typography
				variant="h4"
				component="h1"
				sx={{
					textAlign: "center",
				}}>
				todos
			</Typography>
			<Paper
				sx={{
					width: "100%",
					borderRadius: 0,
				}}>
				<InputForm />
				<TodoList />
				<Footer />
			</Paper>
		</Container>
	);
};

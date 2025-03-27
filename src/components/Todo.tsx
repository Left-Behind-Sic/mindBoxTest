import { Container, Paper, Typography } from "@mui/material";
import Footer from "./Footer";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
	return (
		<Container maxWidth="md" sx={{ width: "100%", m: 0, p: 1 }}>
			<Typography
				variant="h4"
				component="h1"
				sx={{
					textAlign: "center",
				}}
			>
				todos
			</Typography>
			<Paper
				sx={{
					width: "100%",
					borderRadius: 0,
				}}
			>
				<TodoForm />
				<TodoList />
				<Footer />
			</Paper>
		</Container>
	);
};

export default Todo;

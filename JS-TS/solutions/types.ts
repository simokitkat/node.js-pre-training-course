interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  readonly createdAt: Date;
}

enum TodoStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

// TODO Task 1: NewTodo = Todo without id, createdAt and status
type NewTodo = Omit<Todo, "id" | "createdAt" | "status">;

export { Todo, TodoStatus, NewTodo };

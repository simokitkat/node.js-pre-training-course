import { TodoApi } from "./todo-api";
import { Todo, TodoStatus } from "./types";

export class TodoService {
  constructor(private readonly api: TodoApi) {}

  async create(title: string, description?: string): Promise<Todo> {
    if (!title.trim()) {
      throw new Error("Title is required");
    }

    const todo = await this.api.add({ title, description });

    return todo;
  }

  async toggleStatus(id: number): Promise<Todo> {
    const newStatus = (status: TodoStatus) =>
      status === TodoStatus.PENDING
        ? TodoStatus.IN_PROGRESS
        : status === TodoStatus.IN_PROGRESS
          ? TodoStatus.COMPLETED
          : TodoStatus.PENDING;

    const allTodos = await this.api.getAll();

    const todo = allTodos.find((todo) => todo.id === id);

    let updatedTodo = {} as Todo;

    if (todo) {
      updatedTodo = await this.api.update(id, {
        status: newStatus(todo.status),
      });
    }

    return updatedTodo;
  }

  async setStatus(id: number, status: TodoStatus): Promise<Todo> {
    return this.api.update(id, { status });
  }

  async search(keyword: string): Promise<Todo[]> {
    const validator = (todo: Todo) => {
      const insensitiveTitle = todo.title.toLowerCase();
      const insensitiveKeyword = keyword.toLowerCase();
      const insensitiveDescription = todo.description?.toLowerCase();

      return (
        insensitiveTitle.includes(insensitiveKeyword) ||
        insensitiveDescription?.includes(insensitiveKeyword)
      );
    };

    const allTodos = await this.api.getAll();

    return allTodos.filter(validator);
  }
}

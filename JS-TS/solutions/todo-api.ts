import { createTodo } from "./todo-factory";
import { Todo, NewTodo } from "./types";

export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super();
    this.name = "TodoNotFoundError";
  }
}

export class TodoApi {
  // Task 6 stores todos in a plain array; Task 7 replaces it with InMemoryRepository
  private todos: Todo[] = [];

  async getAll(): Promise<Todo[]> {
    await Promise.resolve(setTimeout(() => {}, 600));

    return this.todos;
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await Promise.resolve(setTimeout(() => {}, 300));

    const added = createTodo(newTodo);

    this.todos.push(added);

    return added;
  }

  async update(
    id: number,
    update: Partial<Omit<Todo, "id" | "createdAt">>,
  ): Promise<Todo> {
    await Promise.resolve(setTimeout(() => {}, 450));

    const todoToUpdate = this.todos.find((todo) => todo.id === id);

    if (!todoToUpdate) {
      throw new TodoNotFoundError(id);
    }

    return { ...todoToUpdate, ...update };
  }

  async remove(id: number): Promise<void> {
    await Promise.resolve(setTimeout(() => {}, 450));

    const todoToRemove = this.todos.find((todo) => todo.id === id);

    if (!todoToRemove) {
      throw new TodoNotFoundError(id);
    }

    this.todos = this.todos.filter((todo) => todo !== todoToRemove);
  }
}

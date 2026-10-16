import { InMemoryRepository } from "./repository";
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
  // private todos: Todo[] = [];

  constructor(private readonly repo = new InMemoryRepository<Todo>()) {}

  async getAll(): Promise<Todo[]> {
    await Promise.resolve(setTimeout(() => {}, 600));

    // return this.todos;
    return this.repo.findAll();
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await Promise.resolve(setTimeout(() => {}, 300));

    const added = createTodo(newTodo);

    // this.todos.push(added);
    this.repo.add(added);

    return added;
  }

  async update(
    id: number,
    update: Partial<Omit<Todo, "id" | "createdAt">>,
  ): Promise<Todo> {
    await Promise.resolve(setTimeout(() => {}, 450));

    const todoToUpdate = this.repo.findById(id);

    if (!todoToUpdate) {
      throw new TodoNotFoundError(id);
    }

    // return { ...todoToUpdate, ...update };
    return this.repo.update(id, update);
  }

  async remove(id: number): Promise<void> {
    await Promise.resolve(setTimeout(() => {}, 450));

    const todoToRemove = this.repo.findById(id);

    if (!todoToRemove) {
      throw new TodoNotFoundError(id);
    }

    // this.todos = this.todos.filter((todo) => todo !== todoToRemove);

    this.repo.remove(id);
  }
}

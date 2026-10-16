import { TodoService } from "./todo-service";
import { TodoApi } from "./todo-api";
import { InMemoryRepository } from "./repository";
import { Todo, TodoStatus } from "./types";

export class ToDoManager {
  private repo = new InMemoryRepository<Todo>();
  private api = new TodoApi(this.repo);
  private service = new TodoService(this.api);

  async init(): Promise<void> {
    await this.service.create("Demo Todo 1", "This is a demo todo");
    await this.service.create("Demo Todo 2");
  }

  async add(title: string, description?: string): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    await this.service.setStatus(id, TodoStatus.COMPLETED);
  }

  async list(): Promise<Todo[]> {
    const todos = await this.api.getAll();
    return todos;
  }
}

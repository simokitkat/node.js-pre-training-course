import { InMemoryRepository } from "../JS-TS/solutions/repository";
import { TodoService } from "../JS-TS/solutions/todo-service";
import { TodoApi } from "../JS-TS/solutions/todo-api";
import { TodoStatus } from "../JS-TS/solutions/types";

interface Item {
  id: number;
  name: string;
}

describe("InMemoryRepository", () => {
  let repo: InMemoryRepository<Item>;

  beforeEach(() => {
    repo = new InMemoryRepository<Item>();
  });

  it("check that adding items works", () => {
    const testItem = { id: 1, name: "Test Item 1" };

    repo.add(testItem);

    expect(repo.findAll().length).toEqual(1);
    expect(repo.findById(1)).toEqual(testItem);
  });

  it("check that items can be found by ID", () => {
    const testItem = { id: 2, name: "Test Item 2" };

    repo.add(testItem);

    expect(repo.findById(2)).toEqual(testItem);
  });

  it("check that all items can be retrieved", () => {
    const testItem1 = { id: 1, name: "Test Item 1" };
    const testItem2 = { id: 2, name: "Test Item 2" };
    const testItem3 = { id: 3, name: "Test Item 3" };
    const testItem4 = { id: 4, name: "Test Item 4" };

    repo.add(testItem1);
    repo.add(testItem2);
    repo.add(testItem3);
    repo.add(testItem4);

    expect(repo.findAll().length).toEqual(4);
    expect(repo.findAll()).toEqual([
      testItem1,
      testItem2,
      testItem3,
      testItem4,
    ]);
  });

  it("check that items can be updated", () => {
    const id = 1;
    repo.add({ id, name: "Test Item A" });
    const updatedItem = { id, name: "Updated Test Item A" };

    repo.update(id, updatedItem);

    expect(repo.findById(id)).toEqual(updatedItem);
  });

  it("check that items can be deleted", () => {
    const id = 4;
    repo.add({ id, name: "Test Item 4" });

    repo.remove(id);

    expect(repo.findById(id)).toBeUndefined();
    expect(repo.findAll().length).toEqual(0);
  });

  it("throws when updating a non-existent item", () => {
    expect(() => repo.update(999, { name: "X" } as Partial<Item>)).toThrow();
  });

  it("throws when removing a non-existent item", () => {
    expect(() => repo.remove(999)).toThrow();
  });
});

describe("TodoService", () => {
  let service: TodoService;

  beforeEach(() => {
    jest.spyOn(global, "setTimeout").mockImplementation((cb: any) => {
      cb();
      return 0 as any;
    });
    service = new TodoService(new TodoApi());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("creates a todo successfully", async () => {
    const todo = await service.create("Test Todo");
    expect(todo.title).toBe("Test Todo");
    expect(todo.status).toBe(TodoStatus.PENDING);
    expect(typeof todo.id).toBe("number");
  });

  it("creates a todo with optional description", async () => {
    const todo = await service.create("Test", "description");
    expect(todo.title).toBe("Test");
    expect(todo.description).toBe("description");
  });

  it("throws when creating todo with empty title", async () => {
    await expect(service.create("")).rejects.toThrow();
  });

  it("throws when creating todo with whitespace-only title", async () => {
    await expect(service.create("   ")).rejects.toThrow();
  });

  it("toggles status through full cycle", async () => {
    const todo = await service.create("Cycle");
    let result = await service.toggleStatus(todo.id);
    expect(result.status).toBe(TodoStatus.IN_PROGRESS);
    result = await service.toggleStatus(todo.id);
    expect(result.status).toBe(TodoStatus.COMPLETED);
    result = await service.toggleStatus(todo.id);
    expect(result.status).toBe(TodoStatus.PENDING);
  });

  it("returns empty object when toggling non-existent todo", async () => {
    const result = await service.toggleStatus(999);
    expect(result).toEqual({});
  });

  it("sets status successfully", async () => {
    const todo = await service.create("Set");
    const updated = await service.setStatus(todo.id, TodoStatus.COMPLETED);
    expect(updated.status).toBe(TodoStatus.COMPLETED);
  });

  it("throws when setStatus is called with non-existing id", async () => {
    await expect(
      service.setStatus(999, TodoStatus.COMPLETED),
    ).rejects.toThrow();
  });

  it("search returns matching items by title (case-insensitive)", async () => {
    await service.create("Hello World");
    const results = await service.search("hello");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe("Hello World");
  });

  it("search returns matching items by description", async () => {
    await service.create("Item", "important note");
    const results = await service.search("important");
    expect(results.length).toBe(1);
  });

  it("search returns empty array when no match", async () => {
    const results = await service.search("nonexistent");
    expect(results).toEqual([]);
  });

  it("search handles todos with no description", async () => {
    await service.create("NoDesc");
    const results = await service.search("nodesc");
    expect(results.length).toBe(1);
  });
});

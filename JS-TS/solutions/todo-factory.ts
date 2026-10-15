import { Todo, NewTodo, TodoStatus } from "./types";

let nextId = 1;

export function createTodo(input: NewTodo): Todo {
  const solution: Todo = {
    ...input,
    id: nextId,
    createdAt: new Date(),
    status: TodoStatus.PENDING,
  };

  nextId++;

  return solution;
}

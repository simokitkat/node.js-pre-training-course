import { Todo } from "./types";

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  return [...state, todo];
}

export function updateTodo(
  state: Todo[],
  id: number,
  update: Partial<Omit<Todo, "id" | "createdAt">>,
): Todo[] {
  const todoToUpdate = state.find((todo) => todo.id === id);

  if (!todoToUpdate) {
    throw new Error("This Todo doesn't exist!");
  }

  const solution = state.map((todo) => {
    if (todo === todoToUpdate) {
      return { ...todo, ...update };
    }

    return todo;
  });

  return solution;
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  const todoToDelete = state.find((todo) => todo.id === id);

  if (!todoToDelete) {
    throw new Error("This Todo doesn't exist!");
  }

  return state.filter((todo) => todo !== todoToDelete);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  return state.find((todo) => todo.id === id);
}

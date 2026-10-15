import { Todo, TodoStatus } from "./types";

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  return state.map((todo) => {
    if (completed) {
      return { ...todo, status: TodoStatus.COMPLETED };
    }

    return { ...todo, status: TodoStatus.PENDING };
  });
}

export function clearCompleted(state: Todo[]): Todo[] {
  return state.filter((todo) => todo.status !== TodoStatus.COMPLETED);
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
  return state.reduce((a, b) => {
    if (b.status === status) {
      a++;
    }

    return a;
  }, 0);
}

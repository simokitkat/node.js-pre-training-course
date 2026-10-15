/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(
  source: readonly T[],
  mapper: (item: T, index: number) => R,
): R[] {
  if (source === null || source === undefined) {
    throw new TypeError("Source is null or undefined");
  }

  const solution: R[] = [];

  source.forEach((item, index) => {
    solution.push(mapper(item, index));
  });

  return solution;
}

export function filterArray<T>(
  source: readonly T[],
  predicate: (item: T, index: number) => boolean,
): T[] {
  if (source === null || source === undefined) {
    throw new TypeError("Source is null or undefined");
  }

  const solution: T[] = [];

  source.forEach((item, index) => {
    if (predicate(item, index)) {
      solution.push(item);
    }
  });

  return solution;
}

export function reduceArray<T, R>(
  source: readonly T[],
  reducer: (acc: R, item: T, index: number) => R,
  initial: R,
): R {
  if (source === null || source === undefined) {
    throw new TypeError("Source is null or undefined");
  }

  let solution = initial;

  source.forEach((item, index) => {
    solution = reducer(solution, item, index);
  });

  return solution;
}

export function partition<T>(
  source: readonly T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  if (source === null || source === undefined) {
    throw new TypeError("Source is null or undefined");
  }

  const passed: T[] = [];
  const failed: T[] = [];

  source.forEach((item) => {
    if (predicate(item)) {
      passed.push(item);
    } else {
      failed.push(item);
    }
  });

  return [passed, failed];
}

export function groupBy<T, K extends PropertyKey>(
  source: readonly T[],
  keySelector: (item: T) => K,
): Record<K, T[]> {
  if (source === null || source === undefined) {
    throw new TypeError("Source is null or undefined");
  }

  const solution = {} as Record<K, T[]>;

  source.forEach((item) => {
    const checker = keySelector(item);

    if (checker in solution) {
      solution[checker].push(item);
    } else {
      solution[checker] = [item];
    }
  });

  return solution;
}

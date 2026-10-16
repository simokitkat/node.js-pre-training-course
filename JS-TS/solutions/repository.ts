export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    this.items.push(entity);
    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    // const itemToUpdate = this.items.find((item) => item.id === id);
    const itemToUpdate = this.findById(id);

    if (!itemToUpdate) {
      throw new Error(`No such item with id ${id}`);
    }

    for (const key in itemToUpdate) {
      if (key in patch) {
        itemToUpdate[key] = patch[key]!;
      }
    }

    return itemToUpdate;
  }

  remove(id: number): void {
    const itemToRemove = this.items.find((item) => item.id === id);

    if (!itemToRemove) {
      throw new Error(`No such item with id ${id}`);
    }

    this.items = this.items.filter((item) => item !== itemToRemove);
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  findAll(): T[] {
    return this.items;
  }
}

abstract class List<T> {
  public abstract add(value: T, index?: number): boolean;
  public abstract get(index: number): T;
  public abstract remove(index: number): T;
  public abstract size(): number;
  public abstract toString(): string;
  public abstract iterator(): IterableIterator<T>;
}
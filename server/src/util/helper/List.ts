abstract class List<T> {
  public abstract add(value: T): boolean;
  public abstract addAll(list: List<T>): boolean;
  public abstract clear(): void;
  public abstract contains(value: T): boolean;
  public abstract get(index: number): T;
  public abstract remove(index: number): T;
  public abstract size(): number;
  public abstract toString(): string;
  public abstract iterator(): IterableIterator<T>;
}
export { List };
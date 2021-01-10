import { List } from "./List";
/**
 * Node object for LinkedList
 */
class Node<T> {
  private value: T;
  private next: Node<T> | null;
  private prev: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }

  public getValue(): T {
    return this.value;
  }

  public setValue(value: T): void {
    this.value = value;
  }

  public getNext(): any {
    return this.next;
  }

  public setNext(next: Node<T> | null): void {
    this.next = next;
  }

  public getPrev(): any {
    return this.prev;
  }

  public setPrev(prev: Node<T> | null): void {
    this.prev = prev;
  }
}
class LinkedList<T> extends List<T> {
  private head: Node<T> | null;
  private length: number;

  /**
   * Construct a new Linked List object
   */
  constructor() {
    super();
    this.head = null;
    this.length = 0;
  }

  /**
   * Add to tail
   * @param element Element to add
   * @returns true if element added, false otherwise
   */
  public add(element: T): boolean {
    let node: Node<T> = new Node<T>(element);
    if (this.head === null) {
      this.head = node;
      this.length++;
      return true;
    }
    let temp: Node<T> = this.head;
    while (temp.getNext() !== null) {
      temp = temp.getNext();
    }
    node.setPrev(temp);
    temp.setNext(node);
    this.length++;
    return true;
  }

  public addAll(list: List<T>): boolean {
    for(let i=0; i<list.size(); i++){
      this.add(list.get(i));
    }
    return true;
  }

  /**
   * Remove a value
   * @param index Index of value to remove at
   * @returns Element removed
   */
  public remove(index: number): T {
    if (this.head === null) {
      throw new Error(`Empty list, cannot remove value at index ${index}`);
    }
    if (index >= this.length) {
      throw new Error(
        `Index out of bounds! Cannot remove index ${index} when the last element is at index ${
          this.length - 1
        }`
      );
    }
    if (index === 0) {
      let next: Node<T> = this.head.getNext();
      let val: T = this.head.getValue();
      next.setPrev(null);
      this.head = next;
      this.length--;
      return val;
    }
    if (index === this.length - 1) {
      let temp: Node<T> = this.head;
      while (temp.getNext() != null) {
        temp = temp.getNext();
      }
      let prev: Node<T> = temp.getPrev();
      let val: T = temp.getValue();
      prev.setNext(null);
      this.length--;
      return val;
    }
    let temp: Node<T> = this.head;
    let count: number = 0;
    while (temp != null && count < index) {
      temp = temp.getNext();
      count++;
    }
    let prev: Node<T> = temp.getPrev();
    let next: Node<T> = temp.getNext();
    prev.setNext(next);
    next.setPrev(prev);
    this.length--;
    return temp.getValue();
  }

  /**
   * Clear list
   */
  public clear(): void {
    if (this.head === null) {
      return;
    }
    let temp: Node<T> = this.head;
    let prev: Node<T> = this.head.getPrev();
    while (temp != null) {
      prev = temp.getPrev();
      temp = temp.getNext();
    }
    while (prev != null) {
      prev.setNext(null);
      prev = prev.getPrev();
    }
    this.head = null;
    this.length = 0;
  }
  /**
   * Check if element exists in LinkedList
   * @param element Element to check
   * @returns true if element found, false if not
   */
  public contains(element: T): boolean {
    if (this.head === null) {
      return false;
    }
    let temp: Node<T> = this.head;
    while (temp != null) {
      if (temp.getValue() === element) {
        return true;
      }
      temp = temp.getNext();
    }
    return false;
  }
  /**
   * Get an element based on the index
   * @param index index to retrieve from
   * @throws Empty list error if head is empty and Index error if index provided is too large
   * @returns element retrieved at the given index
   */
  public get(index: number): T {
    if (this.head === null) {
      throw new Error("Empty list, no head!");
    }
    if (index >= this.length || index < 0) {
      throw new Error("Index out of bounds!");
    }
    let temp: Node<T> = this.head;
    let count: number = 0;
    while (count < index && temp.getNext() !== null) {
      count++;
      temp = temp.getNext();
    }
    return temp.getValue();
  }
  /**
   * Get the index of a given element, returns -1 if element doesn't exist
   * @param element Element to get the index of
   * @returns index of element, or -1 if not found
   */
  public indexOf(element: T): number {
    let index: number = -1;
    if (this.head === null) {
      return -1;
    }
    let temp: Node<T> = this.head;
    while (temp != null) {
      index++;
      if (temp.getValue() === element) {
        return index;
      }
      temp = temp.getNext();
    }
    return index;
  }

  /**
   * Set the value at an index to a new element
   * @param index Index of element to set
   * @param element Element to change to
   */
  public set(index: number, element: T): T {
    if (this.head === null) {
      throw new Error("Empty list, cannot set any value!");
    }
    if (index >= this.length) {
      throw new Error("Index too large, cannot set value!");
    }
    let temp: Node<T> = this.head;
    let count: number = 0;
    while (temp != null && count < index) {
      temp = temp.getNext();
      count++;
    }
    temp.setValue(element);
    return temp.getValue();
  }
  /**
   * Size of the linked list
   */
  public size(): number {
    return this.length;
  }

  /**
   * Iterator
   * @returns iterable iterator
   */
  public *iterator(): IterableIterator<T> {
    if(this.head === null){
      return null;
    }
    let current: Node<T> = this.head;
    while(current){
      yield current.getValue();
      current = current.getNext();
    }
  }

  /**
   * Iterator symbol
   */
  public [Symbol.iterator](){
    return this.iterator();
  }

  /**
   * String representation of Linked List
   * @returns String representation of Linked List
   */
  public toString(): string {
    let str = "List: ";
    if (this.head === null) {
      return "Empty List";
    }
    let temp: Node<T> = this.head;
    while (temp !== null) {
      str += temp.getValue();
      str += " ";
      temp = temp.getNext();
    }
    return str;
  }
}
export { LinkedList };

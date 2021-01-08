class Node<T> {
  private data: T;
  private next: Node<T>;
  private prev: Node<T>;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T): void {
    this.data = data;
  }

  public getNext(): Node<T> {
    return this.next;
  }

  public setNext(next: Node<T> | null) {
    this.next = next;
  }

  public getPrev(): Node<T> {
    return this.prev;
  }

  public setPrev(prev: Node<T> | null) {
    this.prev = prev;
  }

  public toString(): string {
    return this.data.toString();
  }
}

class LinkedList<T> extends List<T> {
  private head: Node<T>;
  private length: number;

  constructor() {
    super();
    this.head = null;
    this.length = 0;
  }

  public add(value: T, index?: number): boolean {
    let node: Node<T> = new Node<T>(value);
    if (this.head === null) {
      this.head = node;
      this.length++;
      return true;
    }
    let count: number = 0;
    let temp: Node<T> = this.head;
    if (index !== undefined) {
      if (index > this.length || index < 0) {
        throw new Error("Index out of Bounds");
      }
      while (temp.getNext() !== null && count < index) {
        temp = temp.getNext();
        count++;
      }
      let prev: Node<T> = temp.getPrev();
      node.setNext(temp.getNext());
      node.setPrev(prev);
      prev.setNext(node);
      this.length++;
      return true;
    }
    while (temp.getNext() !== null) {
      temp = temp.getNext();
      let prev: Node<T> = temp.getPrev();
      node.setNext(temp.getNext());
      node.setPrev(prev);
      prev.setNext(node);
      this.length++;
      return true;
    }
  }

  public addAll(list: LinkedList<T>): boolean{
    for(let i=0; i<list.size(); i++){
      this.add(list.get(i));
    }
    return true;
  }

  public clear(): void {
    for(let i=this.length; i>-1; i--){
      this.remove(i);
    }
  }

  public contains(value: T): boolean {
    if(this.head === null){
      return false;
    }
    let temp: Node<T> = this.head;
    while(temp !== null){
      if(temp.getData() === value){
        return true;
      }
      temp = temp.getNext();
    }
    return false;
  }

  public get(index: number): T {
    if (this.head === null) {
      throw new Error("Empty List!");
    }
    if (index >= this.length || index < 0) {
      throw new Error("Index out of bounds");
    }
    let temp: Node<T> = this.head;
    let count: number = 0;
    if (index === 0) {
      return this.head.getData();
    }
    while (temp !== null && count < index) {
      temp = temp.getNext();
      count++;
    }
    return temp.getData();
  }

  public remove(index: number): T {
    if (this.head === null) {
      throw new Error("Empty head");
    }
    if (index >= this.length || index < 0) {
      throw new Error("Index out of bounds");
    }
    let count: number = 0;
    let temp: Node<T> = this.head;
    while (temp !== null && count < index) {
      temp = temp.getNext();
      count++;
    }
    let next: Node<T> = temp.getNext();
    let prev: Node<T> = temp.getPrev();
    prev.setNext(next);
    next.setPrev(prev);
    this.length--;
    return temp.getData();
  }

  public size(): number {
    return this.length;
  }

  public toString(): string {
    let str: string = "LinkedList: ";
    let temp: Node<T> = this.head;
    if (this.head === null) {
      return "Empty LinkedList";
    }
    while (temp !== null) {
      str += `${temp.getData()} `;
      temp = temp.getNext();
    }
    return str;
  }

  public *iterator(): IterableIterator<T> {
    let data: Node<T> = this.head;
    while (data) {
      yield data.getData();
      data = data.getNext();
    }
  }

  public [Symbol.iterator](){
    return this.iterator();
  }
}

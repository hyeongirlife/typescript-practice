{
  // !! stack 은 어떤 API를 가지는지?
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }
  // !! 연결리스트를 생각했을 때 value는 현재 노드, next는 다음 노드의 주소값을 가리킴
  type StackNode = {
    readonly value: string;
    readonly next: StackNode | undefined;
  };

  class StackImpl implements Stack {
    private _size: number = 0;
    private head?: StackNode;

    get size() {
      return this._size;
    }
    push(value: string) {
      // !! head가 새로운 노드를 바라보도록 함
      const node: StackNode = { value, next: this.head };
      this.head = node;
      this._size++;
    }
    pop(): string {
      // !! undefined로 체크를 하면 null은 인식을 못하므로 조건문을 통과될 수 있다.
      if (this.head == null) {
        // !! null == undefined (느슨한 true) null === undefined (엄격한 false)
        throw new Error("스택이 비어 있다.");
      }
      // !! node는 있을 수도 있고 없을 수도 있다.
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }
  const stack = new StackImpl();

  stack.push("현걸이");
  stack.push("윤둥이");
  console.log(stack);
  stack.pop();
  stack.pop();
  console.log(stack);
}

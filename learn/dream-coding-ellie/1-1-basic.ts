// !! unknown 타입을 사용하지 않는 것이 좋다.
let notSure: unknown = 0;
notSure = "he";
// notSure = true;
console.log(notSure);

// !! void : 공허한, 비어있는

function print(): void {
  console.log("hello");
  return;
}
print();

// !! never는 리턴할 계획이 없는 타입
function throwError(message: string): never {
  // message -> server (log)
  throw new Error(message);
}

// !! object 타입 -> 쓰지 않는 게 좋음
function acceptSomeObject(obj: object) {
  console.log({ x: 1 });
}
acceptSomeObject({ dog: [1, 2, 3] });

// !! object 타입은 좀 더 구체적으로 작성
function accpeSomeObject2(obj: { x: string; y: number }) {
  console.log(obj.x, obj.y);
}

accpeSomeObject2({ x: "string", y: 1 });
accpeSomeObject2({ x: 1, y: "string" });

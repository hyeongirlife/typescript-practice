// any 타입은 특정 값으로 인해 타입 검사 오류가 발생하는 것을 원하지 않을 때 사용한다.

// 아래 이어지는 코드들은 모두 오류 없이 정상적으로 실행됩니다.
// `any`를 사용하면 추가적인 타입 검사가 비활성화되며,
// 당신이 TypeScript보다 상황을 더 잘 이해하고 있다고 가정합니다.

let obj: any = { x: 0 };
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

// !! 객체 타입은 해당 객체들의 프로퍼티
function printName(obj: { first: string; last?: string }) {
  // ...
}
// 둘 다 OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// !! 유니언 타입

function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
console.log(printId(101), printId("202"), printId({ myID: 22342 }));

// !! x의 타입이 string[]이 아니라면 string 타입이므로 따로 else 분리 문을 작성할 필요가 없다.
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // 여기에서 'x'는 'string[]' 타입입니다
    console.log("Hello, " + x.join(" and "));
  } else {
    // 여기에서 'x'는 'string' 타입입니다
    console.log("Welcome lone traveler " + x);
  }
}

// !! 인터페이스 확장하기
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

function bear(obj: Bear) {
  console.log(obj.name, obj.honey);
}

// !! 리터럴 타입은 일반적인 타입 이외에도, 구체적인 문자열과 숫자 값을 타입 위치에서 지정할 수 있다.
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");

// !! 리터럴 추론

// !! null과 undefined
// strictNullChecks 가 설정되어 있다면 옵셔널 프로퍼티를 사용하기에 앞서
// undefined와 null일 수 있는 값에 대한 검사를 수행할 수 있다.

function doSomething(x: string | undefined) {
  if (x === undefined) {
    // 아무 것도 하지 않는다
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
// 혹은 접미사 !를 사용하여 해당 값이 null 또는 undefined가 아니라고 타입을 단언할 수 있다.

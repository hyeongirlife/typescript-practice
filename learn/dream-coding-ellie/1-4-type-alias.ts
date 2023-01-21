// type GreetingLike = string | (() => string) | MyGreeter;
// declare function greet(g: GreetingLike): void;

// function getGreeting() {
//   return "howdy";
// }
// class MyGreeter extends Greeter {}

// greet("hello");
// greet(getGreeting);
// greet(new MyGreeter());

// !! type-alias : 직접 원하는 타입 형태를 지정해줄 수 있다.
{
  type Text = string;
  const name: Text = "hyeongeol";
  const address: Text = "korea";
  type Num = number;
  type Student = { name: string; age: number };

  const student: Student = {
    name: "Lee-Hyeon-geol",
    age: 28,
  };

  // !! leteral type은 정확한 타입 뿐만 아니라 변수 값도 체킹 한다.
  type Name = "name";
  let hyeongeolName: Name = "name";
  console.log(hyeongeolName);
  type Boal = true;
  const boolean: Boal = true;
}

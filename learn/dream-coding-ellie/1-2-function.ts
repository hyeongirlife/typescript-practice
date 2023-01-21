// // !! JS
// function jsAdd(num1, num2) {
//   return num1 + num2;
// }
// // !! TS
// function jsAdd2(num1: number, num2: number): number {
//   return num1 + num2;
// }

// // !! JS
// // 어떤 타입의 값을 리턴하는지 return문에 가서 확인해야 함
// function fetchNum(id) {
//   // code ...
//   return new Promise((resolve, reject) => {
//     resolve(100);
//   });
// }

// // !! TS
// function fetchNum(id: string): Promise<number> {
//   // code...
//   return new Promise((resolve, reject) => {
//     resolve(100);
//   });
// }

// // !! Optional Type -> 인자를 전달해도되고 전달 하지 않아도 된다.
// function printName(firstName: string, lastName?: string) {
//   console.log(firstName);
//   console.log(lastName);
// }

// printName("hyeongeol");
// printName("myLife", "hyeongeol");

// // !! Default parameter
// function printMessage(message: string = "기본메시지") {
//   console.log(message);
// }

// printMessage();

// !! Rest parameter
function addNumbers(...numbers: number[]): number {
  return numbers.reduce((acc, cur) => acc + cur, numbers[5]);
}

console.log(addNumbers(1, 2, 3, 4, 5, 6));

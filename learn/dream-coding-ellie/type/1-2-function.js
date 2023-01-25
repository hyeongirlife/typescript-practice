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
{
    // !! Optional Type
    function printName(firstName, lastName) {
        console.log(firstName);
        console.log(lastName);
    }
    printName("hyeongeol");
    printName("myLife", "hyeongeol");
}

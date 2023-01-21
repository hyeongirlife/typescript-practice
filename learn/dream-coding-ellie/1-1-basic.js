// !! unknown 타입을 사용하지 않는 것이 좋다.
var notSure = 0;
notSure = "he";
// notSure = true;
console.log(notSure);
// !! void : 공허한, 비어있는
function print() {
  console.log("hello");
  return;
}
print();

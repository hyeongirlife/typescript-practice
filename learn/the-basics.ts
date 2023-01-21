const message = "Hello World";
message.toLowerCase();
// message();

function fn(x) {
  return x.flip();
}

// 정적 타입 검사 : 코드가 실행되기 전에 코드에 대해 예측하는 것

const user = {
  name: "Daniel",
  age: 26,
};

// user.location; // JS에서는 undefined를 리턴

function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());

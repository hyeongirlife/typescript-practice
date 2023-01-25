// !! 배열 타입 정하기
const scores: Array<string> = ["apple", "pear"];
const fruits: string[] = ["apple", "pear"];

// 전달된 인자를 함수 내에서 변환하지 않도록 타입으로 보장하기 위해 readonly 속성을 사용한다.
function printArray(fruits: readonly string[]) {
  console.log(fruits);
  fruits.push("grape");
}

// !! 튜플 타입 정하기, 튜플이란 서로 다른 타입의 데이터를 가지는 배열
// !! 튜플 사용 비추 1. 인덱스로 접근하는 것은 가독성이 떨어짐
// !! interface나 class로 접근해보자
let student: [string, number] = ["leehyeongeol", 960924];
student = ["name", 123];
student[0];
student[1];

const [name, age] = student;

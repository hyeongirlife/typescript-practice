// !! 에러 : 예상되는 에러
// !! exceptiion : 예상하지 못한 에러
// !! 우리는 예상되는 에러를 exception 처리하는 습관에서 벗어나야 함 => 엘리 강조

import { readConfigFile } from "typescript";

// !! java는 exception 클래스가 있고, javascript는 Error 클래스가 있다.

// !! Error(Exception) Handling: try -> catch -> finally

function readFile(fileName: string): string {
  if (fileName === "not exist!") {
    throw new Error(`file not exist ${fileName}!`);
  }
  return `file contents`;
}

function closeFile(fileName: string) {
  // 아무것도 하지 않음
}

const fileName = "not exist!";
try {
  console.log(readFile(fileName));
} catch (error) {
  //   console.log(`에러다 ${error}`);
  console.log("$$$$");
} finally {
  closeFile(fileName);
  console.log("#########"); // !! 에러로 인해 죽지 않고 살아있음
}
console.log("!!!!");

// !! padding 타입의 경우, number -> string 타입 순으로 검사할 수 있다.
function padLeft(padding: number | string, input: string) {
  return " ".repeat(padding) + input;
}

// !! 제어 흐름 분석은 변수에 대한 타입 유형을 확정하는 과정을 말한다.
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

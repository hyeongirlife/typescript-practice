{
  // !! discriminated unions
  type SuccessState = {
    result: "success";
    response: {
      body: string;
    };
  };

  type FailureState = {
    result: "failure";
    reason: string;
  };

  // type LoginState = { response: { body: string } } | { reason: string };

  type LoginState = SuccessState | FailureState;
  function printLoginState(state: LoginState): void {
    // if (state.response.body) {
    if (state.result === "success") {
      console.log(state.response.body);
    } else {
      console.log(state.reason);
    }
  }
  // let state = { response: { body: "logged in!" } };
  // !! 왜 에러뜨지?
  const obj = { result: "failure", reason: "incorrected info" };
  console.log(obj.result);
  printLoginState(obj);
}

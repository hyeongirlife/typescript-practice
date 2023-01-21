{
  // !! Union type : OR 로 이해
  type Direction = "left" | "right" | "up" | "down";
  function move(direction: Direction) {
    console.log(direction);
  }
  move("down");

  type TileSize = 4 | 8 | 16;
  const tile: TileSize = 16;

  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailureState = {
    reason: string;
  };
  function login(): SuccessState | FailureState {
    return {
      response: {
        body: "로그인 성공",
      },
    };
  }
  login();
  type LoginState = SuccessState | FailureState;
  function printLoginState(state: LoginState): void {
    // if (state.response.body) {
    if ("response" in state) {
      console.log(state.response.body);
    } else {
      console.log(state.reason);
    }
  }
}

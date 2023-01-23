{
  class TimeOutError extends Error {}
  class OfflineError extends Error {}

  type SuccessState = {
    result: "success";
  };

  type NetworkErrorState = {
    result: "fail";
    reason: "offline" | "down" | "timeout";
  };

  type ResultState = SuccessState | NetworkErrorState;

  class NetWorkClient {
    tryConnect(): ResultState {
      return { result: "fail", reason: "offline" };
    }
  }

  class UserService {
    constructor(private client: NetWorkClient) {}

    login() {
      return this.client.tryConnect();
      // !! 어디에서 에러를 잡아야 유저에게 의미있게 에러를 전달할 수 있을지 고민해야 한다.
    }
    // login...
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      //   try {
      //     this.userService.login();
      //   } catch (error) {
      //     // !! 여기서 에러를 핸들링 하는게 사용자에게 더 친화적이다.
      //     // !! error의 type이 any 이기 떄문에 instanceOf 메소드를 사용할 수 없다.
      //   }
      const status = this.userService.login();
      if (status.result === "fail" && status.reason === "offline") {
        // 유저에게 메시지 전송
      }
    }
  }

  const client = new NetWorkClient();

  const service = new UserService(client);

  const app = new App(service);

  app.run();
}

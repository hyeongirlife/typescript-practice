{
  // !! 절차지향으로 커피머신 만들기
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };
  // public : 외부, 내부에서 접근 가능
  // private : 외부에서 볼 수도 없고, 접근할 수도 없다.
  // protected : 자식 클래스에서만 접근할 수 있음
  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
      console.log(this.coffeeBeans);
    }
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }
  // 외부에 보여주고 싶지 않은 값들은 private 처리하면 감출 수 있다. -> 캡슐화
  //   console.log(CoffeeMaker.BEANS_GRAM_PER_SHOT);
  //   const coffee1 = new CoffeeMaker(22);
  //   console.log(coffee1.fillCoffeeBeans(30));
  //   const coffee2 = new CoffeeMaker(33);
  //   console.log(coffee2);

  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 4;

    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) {
        throw new Error("num should be greater than 0");
      }
      this.internalAge = num;
    }
    constructor(private firstName: string, private lastName: string) {
      //   this.fullName = `${firstName} ${lastName}`;
    }
    handleName(firstName: string) {
      this.firstName = firstName;
    }
  }

  const user = new User("Steve", "Jobs");
  user.age = 6;
  console.log(user.age);
}

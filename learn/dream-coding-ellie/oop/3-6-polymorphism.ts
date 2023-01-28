{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSuger?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    //!! protected 옵션은 상속 클래스에만 접근할 수 있게 하는 접근제어자 이다.
    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMachine(coffeeBeans);
    }
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
      console.log(this.coffeeBeans);
    }
    clean() {
      console.log(`Cleaning the machine...`);
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);

      if (this.coffeeBeans < CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }

      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }
    private preheat(): void {
      console.log("heating up!");
    }
    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots ...`);
      return {
        shots,
        hasMilk: false,
      };
    }
    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
    private steamMilk(): void {
      console.log(`Steaming some milk...`);
    }
    makeCoffee(shots: number): CoffeeCup {
      //!! 상속한 부모 클래스에 있는 함수를 호출할 수 있다.
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return { ...coffee, hasMilk: true };
    }
  }
  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(beans: number) {
      super(beans);
    }

    private plusSuger(): void {
      console.log(`Adding suger in Coffee...`);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.plusSuger();
      return { ...coffee, hasSuger: true };
    }
  }
  const machines: CoffeeMachine[] = [
    new CoffeeMachine(16),
    new CaffeeLatteMachine(16, "1"),
    new SweetCoffeeMaker(16),
    new CoffeeMachine(20),
    new CaffeeLatteMachine(20, "2"),
    new SweetCoffeeMaker(20),
  ];
  //!! 다형성
  machines.forEach((machines) => {
    console.log("-----------------------------");
    machines.makeCoffee(1);
  });
}

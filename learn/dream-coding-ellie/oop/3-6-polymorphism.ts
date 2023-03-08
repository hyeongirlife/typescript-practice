{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSuger?: boolean;
  };

  interface CoffeeMaker {
    fillCoffeeBeans(beans: number): void;
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static bean_per_one_shots: number = 7;
    private bean: number = 0;

    constructor(bean: number) {
      this.bean = bean;
    }

    static makeMachine(bean: number): CoffeeMachine {
      return new CoffeeMachine(bean);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("커피 콩 개수는 0 보다 커야합니다.");
      }
      this.bean += beans;
      console.log(
        `커피콩이 ${beans}개 채워졌고 현재 총 ${this.bean}개 입니다.`
      );
    }
    private grindBeans(shots: number) {
      if (this.bean < shots * CoffeeMachine.bean_per_one_shots) {
        throw new Error("커피 콩이 부족합니다.");
      }
      this.bean -= shots * CoffeeMachine.bean_per_one_shots;
      console.log("커피 콩을 가는 중입니다.");
      console.log(`남아 있는 콩의 개수는 ${this.bean} 입니다.`);
    }

    private preheat(): void {
      console.log("커피를 따뜻하게 데우는 중 입니다.");
    }

    private extract(shots: number): CoffeeCup {
      console.log(`커피 ${shots} 잔을 추출하는 중 입니다.`);
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
    clean() {
      console.log("커피머신을 청소하는 중 입니다.");
    }
  }
  class CaffeeLatteMachine extends CoffeeMachine {
    constructor(beans: number, private readonly serialNumber: string) {
      // !! 부모클래스에서 꼭 필요로 하는 데이터는 받아와야 한다.
      super(beans);
    }
    private steamMilk() {
      console.log("우유를 데우는 중 입니다.");
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        hasSuger: true,
      };
    }
  }

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(16),
    new CaffeeLatteMachine(16, "1"),
    new SweetCoffeeMaker(16),
  ];

  machines.forEach((machine) => {
    console.log("---------------");
    console.log(machine.makeCoffee(2));
  });
}

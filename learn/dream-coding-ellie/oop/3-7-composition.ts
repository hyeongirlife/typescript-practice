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

  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }
  interface SugerProvider {
    addSuger(cup: CoffeeCup): CoffeeCup;
  }

  class CheapMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log(`Steaming some milk...`);
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log(`Fancy Steaming some milk...`);
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log(`Cold Steaming some milk...`);
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //!! 필요한 기능을 가져다 쓰는 기능 composition
  class CandySugerMixer implements SugerProvider {
    private getSuger() {
      console.log(`Getting some suger from Candy!!!!`);
      return true;
    }

    addSuger(cup: CoffeeCup): CoffeeCup {
      const suger = this.getSuger();
      return {
        ...cup,
        hasSuger: suger,
      };
    }
  }

  class SugerMixer implements SugerProvider {
    private getSuger() {
      console.log(`Getting some suger from jar!!!!`);
      return true;
    }

    addSuger(cup: CoffeeCup): CoffeeCup {
      const suger = this.getSuger();
      return {
        ...cup,
        hasSuger: suger,
      };
    }
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
    constructor(
      beans: number,
      public readonly serialNumber: string,
      //!! DI
      private milkFrother: MilkFrother
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      //!! 상속한 부모 클래스에 있는 함수를 호출할 수 있다.
      const coffee = super.makeCoffee(shots);
      return this.milkFrother.makeMilk(coffee);
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(private beans: number, private suger: SugerProvider) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.suger.addSuger(coffee);
    }
  }
  //!! 클래스 간 강한 coupling이 있으면 안된다.
  class SweetCoffeeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: MilkFrother,
      private suger: SugerProvider
    ) {
      super(beans);
    }
    makeSweetCoffeeLatte(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const suggerAdded = this.suger.addSuger(coffee);
      return this.milk.makeMilk(suggerAdded);
    }
  }
  //!! Milk
  const CheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();

  //!! Sugar
  const candySuger = new CandySugerMixer();
  const sugar = new SugerMixer();

  const sweetCandyMaker = new SweetCoffeeMaker(12, candySuger);
  const sweetMachine = new SweetCoffeeMaker(12, sugar);

  const latteMachine = new CaffeeLatteMachine(
    12,
    "serial Number",
    CheapMilkMaker
  );
  const coldLatteMachine = new CaffeeLatteMachine(
    12,
    "serial Number",
    coldMilkMaker
  );

  const sweetLatteMachine = new SweetCoffeeLatteMachine(
    12,
    CheapMilkMaker,
    candySuger
  );
}

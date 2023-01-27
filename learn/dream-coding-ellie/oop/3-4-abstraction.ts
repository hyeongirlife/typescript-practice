{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
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

    constructor(coffeeBeans: number) {
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
  //!! 추상화는 사용하는 사람이 고민 없이 고민 없이 함수를 이용할 수 있게 한다.
  //!! Using Private
  //!! interface 나랑 소통하려면 이런 규약이 있어. like 계약서

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      //   const coffee2 = this.machine.clean();
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
      console.log(coffee);
    }
  }

  const maker : CoffeeMachine = CoffeeMachine.makeMachine(32);

  // 같은 객체를 사용했지만, interface로 인해 각기 다른 메소드들만 사용할 수 있다.
  const amateur : new AmateurUser(maker)
  
  const proBarista= new ProBarista(maker)
  //   maker.clean();
}

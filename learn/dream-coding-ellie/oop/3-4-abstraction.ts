{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };
  // !! 의사소통을 위한 contractor
  // !! I prefix를 붙히거나 뒤에 Impl(Implement)를 붙힘
  interface CoffeeMaker {
    fillCoffeeBeans(beans: number): void;
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  // !! interface를 준수하는 class
  class CoffeeMachine implements CommercialCoffeeMaker, CoffeeMaker {
    private static bean_per_one_shots: number = 7;
    private bean: number = 0;

    private constructor(bean: number) {
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
  // !! 상황에 맞게 인터페이스를 바꿔서 사용할 수 있음
  const coffeeMachine: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);

  // !! 인터페이스 사용 예시
  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}

    makeCoffee() {
      const coffee = this.machine.makeCoffee(1);
      console.log("저는 아마추어 입니다");
    }
  }
  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}

    makeCoffee(shots: number, bean: number) {
      const coffee = this.machine.makeCoffee(shots);

      this.machine.fillCoffeeBeans(bean);
      this.machine.clean();
      console.log("이게바로 프로다");
    }
  }

  const machine = CoffeeMachine.makeMachine(32);
  const amateur = new AmateurUser(machine);
  const proBarista = new ProBarista(machine);
  console.log(amateur.makeCoffee());
  console.log(proBarista.makeCoffee(3, 20));
}

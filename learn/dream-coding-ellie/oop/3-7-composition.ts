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

  interface milkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }
  interface sugerFrother {
    addSuger(cup: CoffeeCup): CoffeeCup;
  }
  abstract class CoffeeMachine implements CoffeeMaker {
    private static bean_per_one_shots: number = 7;
    private bean: number = 0;

    constructor(
      bean: number,
      private milk: milkFrother,
      private suger: sugerFrother
    ) {
      this.bean = bean;
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

    protected abstract extract(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      const coffee = this.extract(shots);
      const sugerAdded = this.suger.addSuger(coffee);
      return this.milk.makeMilk(sugerAdded);
    }
    clean() {
      console.log("커피머신을 청소하는 중 입니다.");
    }
  }

  // !! 부모 클래스에 없는 메소드들은 따로 클래스로 구현해서 사용해보자.
  // !! 싸구려 우유 거품기
  class CheapMilkSteamer implements milkFrother {
    private steamMilk(): void {
      console.log("Steaming some milk");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  // !! 비싼 우유 거품기
  class FancyMilkSteamer implements milkFrother {
    private steamMilk(): void {
      console.log("Steaming Fancy milk");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  // !! 최고급 우유 거품기
  class ColdMilkSteamer implements milkFrother {
    private steamMilk(): void {
      console.log("Steaming Cold milk");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  // !! 우유를 넣지않는 클래스
  class NoMilk implements milkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }
  // !! 설탕 제조기
  class CandySugerMixer implements sugerFrother {
    private getSuger() {
      console.log("사탕으로 부터 설탕을 받아옵니다.");
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
  class SugerMixer implements sugerFrother {
    private getSuger() {
      console.log("Jar로 부터 설탕을 받아옵니다.");
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
  class NoSuger implements sugerFrother {
    addSuger(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // class CaffeeLatteMachine extends CoffeeMachine {
  //   constructor(
  //     beans: number,
  //     private readonly serialNumber: string,
  //     private milkFrother: milkFrother
  //   ) {
  //     // !! 부모클래스에서 꼭 필요로 하는 데이터는 받아와야 한다.
  //     super(beans);
  //   }
  //   private steamMilk() {
  //     console.log("우유를 데우는 중 입니다.");
  //   }
  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.milkFrother.makeMilk(coffee);
  //     // this.steamMilk();
  //     // return {
  //     //   ...coffee,
  //     //   hasMilk: true,
  //     // };
  //   }
  // }

  // class SweetCoffeeMaker extends CoffeeMachine {
  //   constructor(beans: number, private sugerFrother: sugerFrother) {
  //     super(beans);
  //   }
  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.sugerFrother.addSuger(coffee);
  //     // return {
  //     //   ...coffee,
  //     //   hasSuger: true,
  //     // };
  //   }
  // }

  // class SweetCoffeeLatteMachine extends CoffeeMachine {
  //   constructor(
  //     beans: number,
  //     private milkFrother: milkFrother,
  //     private sugerFrother: sugerFrother
  //   ) {
  //     super(beans);
  //   }
  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = this.makeCoffee(shots);
  //     // const { hasMilk } = this.milkFrother.makeMilk(coffee);
  //     // const { hasSuger } = this.sugerFrother.addSuger(coffee);
  //     // return { ...coffee, hasMilk, hasSuger };
  //     const milk = this.milkFrother.makeMilk(coffee);
  //     return this.sugerFrother.addSuger(milk);
  //   }
  // }
  // !! 인터페이스(명세서)를 통한 클래스 간 상호작용 => 디커플링의 원칙
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkSteamer = new FancyMilkSteamer();
  const coldMilkSteamer = new ColdMilkSteamer();

  const candySuger = new CandySugerMixer();
  const suger = new SugerMixer();

  const noMilk = new NoMilk();
  const noSuger = new NoSuger();
  const coffeLatteMachine = new CoffeeMachine(12, cheapMilkMaker, noSuger);
  const sweetCoffeeMachine = new CoffeeMachine(12, noMilk, candySuger);

  console.log(coffeLatteMachine, sweetCoffeeMachine);
}

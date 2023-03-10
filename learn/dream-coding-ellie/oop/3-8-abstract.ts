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

    constructor(bean: number) {
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
    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return { shots, hasMilk: true };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSuger: true,
      };
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
}

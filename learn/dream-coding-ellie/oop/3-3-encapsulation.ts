{
  // !! 절차지향으로 커피머신 만들기
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // !! 외부에서 유효하지 않은 변경을 차단하기 위해 캡슐화가 필요하다
  class CoffeeMaker {
    // !! private: 외부에 노출될 필요가 없을 때, static: 인스턴스 생성시 선언되지 않도록 함
    private static bean_per_one_shots: number = 7;
    private bean: number = 0;
    // !! 생성자 함수로 인스턴스를 만드는 것이 아니라, 지정한 메소드로 생성할 수 있도록 하기 위해 private 설정
    private constructor(bean: number) {
      this.bean = bean;
    }

    static makeMachine(bean: number): CoffeeMaker {
      return new CoffeeMaker(bean);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("커피 콩 개수는 0 보다 커야합니다.");
      }
      this.bean += beans;
    }
    makeCoffee(shots: number): CoffeeCup {
      const bean_per_one_shots = 7;
      if (this.bean < shots * CoffeeMaker.bean_per_one_shots) {
        throw new Error("커피 콩이 부족합니다.");
      }

      this.bean -= shots * bean_per_one_shots;

      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = CoffeeMaker.makeMachine(32);
  maker.fillCoffeeBeans(10);
  console.log(maker);
}

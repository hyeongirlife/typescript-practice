{
  type coffeeCup = {
    shots: number;
    hasMilk: boolean;
  };
  // !! 클래스는 관련된 속성과 함수들을 묶어서 어떤 모양의 데이터가 될 거라는 것을 정의하는 것
  // !! 실제 데이터를 넣어서 객체를 만들 수 있다.
  // !! 데이터를 넣을 때마다 변경되는 값은 멤버변수로, 고정된 값을 이용한다면 static을 사용한다.
  class CoffeeMaker {
    // !! 클래스 -> 인스턴스 레벨로 하향됨으로써 인스턴스 생성 시 같이 생성되지 않음.
    static bean_per_one_shots: number = 7;
    // !! 인스턴스 레벨이므로 인스턴스 생성 시 같이 생성 됨.
    bean: number = 0;
    // !! 인스턴스 생성 시 변수를 할당할 수 있는 생성자 함수
    constructor(bean: number) {
      this.bean = bean;
    }

    static makeMachine(bean: number): CoffeeMaker {
      return new CoffeeMaker(bean);
    }
    makeCoffee(shots: number): coffeeCup {
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
  const oneCoffee = new CoffeeMaker(32);
  const twoCoffee = new CoffeeMaker(14);
  const threeCoffee = CoffeeMaker.makeMachine(32);

  console.log(oneCoffee);
  console.log(twoCoffee);
  console.log(threeCoffee);
}

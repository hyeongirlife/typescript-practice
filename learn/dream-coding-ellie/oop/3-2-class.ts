{
  // !! 절차지향으로 커피머신 만들기
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class coffeeMaker {
    //!! 클래스 내에서 정의 됐고 변하지 않음
    static BEANS_GRAM_PER_SHOT: number = 7; //!! static 옵션을 주면 클래스와 연결되어있어 오브젝트를 만들 때 마다 생성 되지 않음
    coffeeBeans: number = 0; //!! 인스턴스 레벨 이므로 오브젝트 마다 생성 된다.

    // 새로운 인스턴스를 생성할 때 생성자 함수 안에 값을 할당할 수 있음
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    static makeMachine(coffeeBeans: number): coffeeMaker {
      return new coffeeMaker(coffeeBeans);
    }
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < coffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * coffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const coffee1 = new coffeeMaker(22);
  console.log(coffee1);
  const coffee2 = new coffeeMaker(33);
  console.log(coffee2);

  //   //!! primitive type은 타입추론을 이용해도 무방!
  //   const BEANS_GRAM_PER_SHOT = 7;
  //   let coffeeBeans: number = 15;

  //   function makeCoffee(shots: number, hasMilk: boolean): CoffeeCup {
  //     if (coffeeBeans < BEANS_GRAM_PER_SHOT) {
  //       throw new Error("Not enough coffee beans!");
  //     }
  //     coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
  //     return {
  //       shots,
  //       hasMilk: false,
  //     };
  //   }
  //   const coffee = makeCoffee(2, false);
  //   console.log(coffee);
}

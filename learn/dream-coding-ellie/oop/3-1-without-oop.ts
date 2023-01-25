{
  // !! 절차지향으로 커피머신 만들기
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };
  //!! primitive type은 타입추론을 이용해도 무방!
  const BEANS_GRAM_PER_SHOT = 7;
  let coffeeBeans: number = 15;

  function makeCoffee(shots: number, hasMilk: boolean): CoffeeCup {
    if (coffeeBeans < BEANS_GRAM_PER_SHOT) {
      throw new Error("Not enough coffee beans!");
    }
    coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }
  const coffee = makeCoffee(2, false);
  console.log(coffee);
}

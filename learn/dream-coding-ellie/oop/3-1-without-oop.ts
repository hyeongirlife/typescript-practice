{
  type coffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  let bean: number = 21;

  function makeCoffee(shots: number): coffeeCup {
    const bean_per_one_shots = 7;
    if (bean < shots * bean_per_one_shots) {
      throw new Error("커피 콩이 부족합니다.");
    }
    bean -= shots * bean_per_one_shots;
    return {
      shots,
      hasMilk: false,
    };
  }
  const oneCoffee = makeCoffee(4);
  console.log(oneCoffee);
}

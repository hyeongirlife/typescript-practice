const x = {};
const y = {};
console.log(x, y);
console.log(x.toString());

const array = [];
console.log(array);

function CoffeeMachine(beans) {
  this.beans = beans;
  //!! Instance member level => 인스턴스를 생성할 때 마다 만들기 때문에 비효율적이다.
  // this.makeCoffee = (shots) => {
  //   console.log(`making ...`);
  // };
}
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log(`making ...`);
};

const machine1 = new CoffeeMachine(3);
const machine2 = new CoffeeMachine(10);
console.log(machine1);
console.log(machine2);

function LatteMachine(milk) {
  this.milk = milk;
}

LatteMachine.prototype = Object.create(CoffeeMachine.prototype);
const latteMachine = new LatteMachine(123);
console.log(latteMachine);

//!! prototype은 JS에서 상속을 하기 위해 사용, 코드를 재사용하기 위해 사용한다.

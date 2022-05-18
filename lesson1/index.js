const {
  green,
  yellow,
  red
} = require("colors/safe");

const isPrime = (number) => {
  if (number < 2) return false;

  for (let i = 2; i <= number / 2; i++) {
    if (number % i === 0) return false;
  }

  return true;
};

const whatColorIs = (from, to) => {
  from = Math.floor(from);
  to = Math.floor(to);
  let count = 1;
  let quantityPrime = 0;
  for (let number = from; number <= to; number++) {
    let colorer = green;

    if (isPrime(number)) {
      if (count % 2 === 0) {
        colorer = yellow;
        count++;
      } else if (count % 3 === 0) {
        colorer = red;
        count = 1;
      } else {
        count++;
      }

      console.log(colorer(number));
      quantityPrime++;
    }
  }
  if (quantityPrime === 0) console.log(red("В этом диапазоне нет простых чисел."));
}

const checkTypesError = (args) => {
  for (i = 0; i < args.length; i++) {
    if (isNaN(parseFloat(args[i]))) {
      throw new TypeError("Аргумент " + args[i] + " не число!");
    }
  }
};


const from = process.argv[2];
const to = process.argv[3];

checkTypesError([from, to]);
if(from<=to){
  whatColorIs(from, to);
}else{
  console.log(red("Первый аргумент должен быть меньше либо равен второму."));
}

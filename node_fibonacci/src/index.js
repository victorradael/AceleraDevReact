"use strict";

const fibonacci = () => {
  const seqFibonacci = [0, 1];
  const seqFibonacciValorLimite = 350;

  while (seqFibonacci[seqFibonacci.length - 1] < seqFibonacciValorLimite) {
    seqFibonacci.push(
      seqFibonacci[seqFibonacci.length - 1] +
        seqFibonacci[seqFibonacci.length - 2]
    );
  }

  return seqFibonacci;
};

const isFibonnaci = (num) => {
  const seqFibonacci = fibonacci();
  const validade = seqFibonacci.find((number) => number == num);

  if (validade == num) return true;
  else return false;
};

module.exports = {
  fibonacci,
  isFibonnaci,
};

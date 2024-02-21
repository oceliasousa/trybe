// Desafio 11 - Crie a função generatePhoneNumber

function generatePhoneNumber(generator) {
  if (generator.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  let number = '(';
  for (let i = 0; i < generator.length; i += 1) {
    if (generator[i] < 0 || generator[i] > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
    number += generator[i];
    let counter = 0;
    for (let j = 0; j < number.length; j += 1) {
      if (number[j] === generator[i].toString()) {
        counter += 1;
      }
    }
    if (counter >= 3) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
    if (number.length === 3) {
      number += ') ';
    }
    if (number.length === 10) {
      number += '-';
    }
  }
  return number;
}

// Desafio 12 -  Crie a função triangleCheck

function triangleCheck(lineA, lineB, lineC) {
  if ((lineB + lineC > lineA && Math.abs(lineB - lineC) < lineA)
    || (lineA + lineC > lineB && Math.abs(lineA - lineC) < lineB)
    || (lineB + lineA > lineC && Math.abs(lineB - lineA) < lineC)) {
    return (true);
  }
  return (false);
}

// Desafio 13 - Crie a função hydrate

function hydrate(drink) {
  const r = /\d+/g;
  let sum = 0;
  let m = r.exec(drink);
  while (m != null) {
    sum += parseInt(m[0], 10);
    m = r.exec(drink);
  }
  if (sum > 1) {
    return `${sum} copos de água`;
  }
  return `${sum} copo de água`;
}

/* eslint no-undef: 0 */

// Não modifique essas linhas
module.exports = {
  generatePhoneNumber: typeof generatePhoneNumber === 'function' ? generatePhoneNumber : (() => {}),
  triangleCheck: typeof triangleCheck === 'function' ? triangleCheck : (() => {}),
  hydrate: typeof hydrate === 'function' ? hydrate : (() => {}),
};

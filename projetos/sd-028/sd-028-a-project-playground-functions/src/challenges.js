// Desafio 1
function compareTrue(a, b) {
  return a && b;
}

// Desafio 2
function calcArea(base, altura) {
  return (base * altura) / 2;
}

// Desafio 3
function splitSentence(frase) {
  return frase.split(' ');
}

// Desafio 4
function concatName(arrayOfStrings) {
  return `${arrayOfStrings[arrayOfStrings.length - 1]}, ${arrayOfStrings[0]}`;
}

// Desafio 5
function footballPoints(wins, ties) {
  return wins * 3 + ties * 1;
}

// Desafio 6
function highestCount(arrayOfNumbers) {
  let maiorNumero = -999999;
  let maiorNumeroContador = 0;
  for (let i = 0; i < arrayOfNumbers.length; i += 1) {
    if (arrayOfNumbers[i] > maiorNumero) {
      maiorNumero = arrayOfNumbers[i];
      maiorNumeroContador = 1;
    } else if (arrayOfNumbers[i] === maiorNumero) {
      maiorNumeroContador += 1;
    }
  }
  return maiorNumeroContador;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if (Math.abs(mouse - cat1) > Math.abs(mouse - cat2)) {
    return 'cat2';
  }
  if (Math.abs(mouse - cat1) < Math.abs(mouse - cat2)) {
    return 'cat1';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function fizzBuzz(numeros) {
  let arrayFizzBuzz = [];
  for (let i = 0; i < numeros.length; i += 1) {
    if (numeros[i] % 3 === 0 && numeros[i] % 5 === 0) {
      arrayFizzBuzz.push('fizzBuzz');
    } else if (numeros[i] % 3 === 0) {
      arrayFizzBuzz.push('fizz');
    } else if (numeros[i] % 5 === 0) {
      arrayFizzBuzz.push('buzz');
    } else {
      arrayFizzBuzz.push('bug!');
    }
  }
  return arrayFizzBuzz;
}

// Desafio 9
function encode(codifique) {
  return codifique.replace(/a/g, '1').replace(/e/g, '2').replace(/i/g, '3').replace(/o/g, '4')
    .replace(/u/g, '5');
}
// Desafio 9 - esse aqui nao passa no linter
// let variavelDeCodificacao = '';
// for (let i = 0; i < codifique.length; i += 1) {
//   if (codifique[i] === 'a') {
//     variavelDeCodificacao += '1';
//   } else if (codifique[i] === 'e') {
//     variavelDeCodificacao += '2';
//   } else if (codifique[i] === 'i') {
//     variavelDeCodificacao += '3';
//   } else if (codifique[i] === 'o') {
//     variavelDeCodificacao += '4';
//   } else if (codifique[i] === 'u') {
//     variavelDeCodificacao += '5';
//   } else {
//     variavelDeCodificacao += codifique[i];
//   }
// }
// return variavelDeCodificacao;

function decode(decodifique) {
  return decodifique.replace(/1/g, 'a').replace(/2/g, 'e').replace(/3/g, 'i').replace(/4/g, 'o')
    .replace(/5/g, 'u');
}
// Desafio 9 - esse aqui nao passa no linter
// let variavelDeCodificacao = '';
// for (let i = 0; i < decodifique.length; i += 1) {
//   if (decodifique[i] === '1') {
//     variavelDeCodificacao += 'a';
//   } else if (decodifique[i] === '2') {
//     variavelDeCodificacao += 'e';
//   } else if (decodifique[i] === '3') {
//     variavelDeCodificacao += 'i';
//   } else if (decodifique[i] === '4') {
//     variavelDeCodificacao += 'o';
//   } else if (decodifique[i] === '5') {
//     variavelDeCodificacao += 'u';
//   } else {
//     variavelDeCodificacao += decodifique[i];
//   }
// }
// return variavelDeCodificacao;

// Desafio 10
function techList(nomeTecnologias, nomePessoa) {
  if ((nomeTecnologias === undefined || nomeTecnologias.length === 0) || nomePessoa === undefined) {
    return 'Vazio!';
  }
  let a = [];
  for (let i = 0; i < nomeTecnologias.length; i += 1) {
    let b = {
      tech: nomeTecnologias[i],
      name: nomePessoa,
    };
    a.push(b);
  }
  return a.sort((x, y) => ((x.tech > y.tech) ? 1 : -1));
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};

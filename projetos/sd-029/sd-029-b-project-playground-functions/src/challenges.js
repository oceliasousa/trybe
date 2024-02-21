// Desafio 1 - Crie a função compareTrue

function compareTrue(param1, param2) {
  return param1 && param2;
}

// Desafio 2 - Crie a função splitSentence

function splitSentence(phrase) {
  return phrase.split(' ');
}

// Desafio 3 - Crie a função concatName

function concatName(arrayStrings) {
  return `${arrayStrings[arrayStrings.length - 1]}, ${arrayStrings[0]}`;
}

// Desafio 4 - Crie a função footballPoints

function footballPoints(wins, ties) {
  return wins * 3 + ties * 1;
}

// Desafio 5 - Crie a função highestCount

function highestCount(arrayOfNumbers) {
  let number = arrayOfNumbers[0];
  let numberCount = 1;
  for (let i = 1; i < arrayOfNumbers.length; i += 1) {
    if (arrayOfNumbers[i] === number) {
      numberCount += 1;
    } else if (arrayOfNumbers[i] > number) {
      number = arrayOfNumbers[i];
      numberCount = 1;
    }
  }
  return numberCount;
}

// Desafio 6 - Crie as funções calcTriangleArea, calcRectangleArea e calcAllAreas

function calcTriangleArea(base, height) {
  return (base * height) / 2;
}

function calcRectangleArea(base, height) {
  return base * height;
}

function calcAllAreas(base, height, form) {
  if (form === 'triângulo') {
    return `O valor da área do triângulo é de: ${calcTriangleArea(base, height)}`;
  } if (form === 'retângulo') {
    return `O valor da área do retângulo é de: ${calcRectangleArea(base, height)}`;
  }
  return 'Não foi possível fazer o cálculo, insira uma forma geométrica válida';
}

// Desafio 7 - Crie a função catAndMouse

function catAndMouse(mouse, cat1, cat2) {
  if (Math.abs(mouse - cat1) > Math.abs(mouse - cat2)) {
    return 'cat2';
  }
  if (Math.abs(mouse - cat1) < Math.abs(mouse - cat2)) {
    return 'cat1';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8 - Crie a função fizzBuzz

function fizzBuzz(numbers) {
  let arrayFizzBuzz = [];
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] % 3 === 0 && numbers[i] % 5 === 0) {
      arrayFizzBuzz.push('fizzBuzz');
    } else if (numbers[i] % 3 === 0) {
      arrayFizzBuzz.push('fizz');
    } else if (numbers[i] % 5 === 0) {
      arrayFizzBuzz.push('buzz');
    } else {
      arrayFizzBuzz.push('bug!');
    }
  }
  return arrayFizzBuzz;
}

// Desafio 9 - Crie a função encode e a função decode

function encode(string) {
  return string.replace(/a/g, '1').replace(/e/g, '2').replace(/i/g, '3').replace(/o/g, '4')
    .replace(/u/g, '5');
}

function decode(string) {
  return string.replace(/1/g, 'a').replace(/2/g, 'e').replace(/3/g, 'i').replace(/4/g, 'o')
    .replace(/5/g, 'u');
}

// Desafio 10 - Crie a função techList

function techList(technologies, person) {
  if ((technologies === undefined || technologies.length === 0) || person === undefined) {
    return [];
  }
  let a = [];
  for (let i = 0; i < technologies.length; i += 1) {
    let b = {
      tech: technologies[i],
      name: person,
    };
    a.push(b);
  }
  return a.sort((x, y) => ((x.tech > y.tech) ? 1 : -1));
}

// Não modifique essas linhas
module.exports = {
  calcTriangleArea: typeof calcTriangleArea === 'function' ? calcTriangleArea : (() => {}),
  calcRectangleArea: typeof calcRectangleArea === 'function' ? calcRectangleArea : (() => {}),
  calcAllAreas: typeof calcAllAreas === 'function' ? calcAllAreas : (() => {}),
  catAndMouse: typeof catAndMouse === 'function' ? catAndMouse : (() => {}),
  compareTrue: typeof compareTrue === 'function' ? compareTrue : (() => {}),
  concatName: typeof concatName === 'function' ? concatName : (() => {}),
  decode: typeof decode === 'function' ? decode : (() => {}),
  encode: typeof encode === 'function' ? encode : (() => {}),
  fizzBuzz: typeof fizzBuzz === 'function' ? fizzBuzz : (() => {}),
  footballPoints: typeof footballPoints === 'function' ? footballPoints : (() => {}),
  highestCount: typeof highestCount === 'function' ? highestCount : (() => {}),
  splitSentence: typeof splitSentence === 'function' ? splitSentence : (() => {}),
  techList: typeof techList === 'function' ? techList : (() => {}),
};

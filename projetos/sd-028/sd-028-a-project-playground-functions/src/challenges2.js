// Desafio 11
function generatePhoneNumber(gerador) {
  if (gerador.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  let numeroTelefone = '(';
  for (let i = 0; i < gerador.length; i += 1) {
    if (gerador[i] < 0 || gerador[i] > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
    numeroTelefone += gerador[i];
    let repeticoes = 0;
    for (let j = 0; j < numeroTelefone.length; j += 1) {
      if (numeroTelefone[j] === gerador[i].toString()) {
        repeticoes += 1;
      }
    }
    if (repeticoes >= 3) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
    if (numeroTelefone.length === 3) {
      numeroTelefone += ') ';
    }
    if (numeroTelefone.length === 10) {
      numeroTelefone += '-';
    }
  }
  return numeroTelefone;
}

generatePhoneNumber([9, 2, 3, 0, 5, -6, 7, 8, -7, 0, 1]);

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if ((lineB + lineC > lineA && Math.abs(lineB - lineC) < lineA) ||
      (lineA + lineC > lineB && Math.abs(lineA - lineC) < lineB) ||
      (lineB + lineA > lineC && Math.abs(lineB - lineA) < lineC)) {
    return (true);
  }
  return (false);
}

// Desafio 13
function hydrate(bebaAgua) {
  const r = /\d+/g;
  let soma = 0;
  let m = r.exec(bebaAgua);
  while (m != null) {
    soma += parseInt(m[0], 10);
    m = r.exec(bebaAgua);
  }
  if (soma > 1) {
    return `${soma} copos de água`;
  }
  return `${soma} copo de água`;
}

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};

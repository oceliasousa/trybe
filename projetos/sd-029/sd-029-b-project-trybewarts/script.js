const formLogin = document.getElementsByClassName('trybewarts-login')[0];
formLogin.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (email === 'tryber@teste.com' && password === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
});

const checkbox = document.getElementById('agreement');

checkbox.addEventListener('change', () => {
  const submitButton = document.getElementById('submit-btn');
  if (checkbox.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

const msg = document.querySelector('#textarea');

msg.addEventListener('keyup', (event) => {
  const caracteresRestantes = event.target.maxLength - event.target.textLength;
  document.querySelector('.counter').innerHTML = `${caracteresRestantes}`;
});

const formData = document.getElementById('form-data');

function findRadio(input) {
  const parent = document.getElementById(input);
  const items = parent.querySelectorAll('input');
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].checked) {
      return items[i].value;
    }
  }
  return '';
}

function findCheckBox(input) {
  const checked = [];
  const parent = document.getElementById(input);
  const items = parent.querySelectorAll('input');
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].checked) {
      checked.push(items[i].value);
    }
  }
  return checked.join(', ');
}

const newForm = (input, label) => {
  const item = document.getElementById(input);
  const element = document.createElement('p');
  if (input === 'familia' || input === 'radio') {
    element.innerText = `${label}: ${findRadio(input)}`;
  } else if (input === 'materia') {
    element.innerText = `${label}: ${findCheckBox(input)}`;
  } else if (input === 'input-name') {
    const item2 = document.getElementById('input-lastname');
    element.innerText = `${label}: ${item.value} ${item2.value}`;
  } else {
    element.innerText = `${label}: ${item.value}`;
  }
  formData.appendChild(element);
};

const form = document.getElementById('evaluation-form');
const body = document.getElementById('main-container');

form.addEventListener('submit', (event) => {
  body.style.display = 'none';
  event.preventDefault();
  formData.innerText = '';
  newForm('input-name', 'Nome');
  newForm('input-email', 'Email');
  newForm('house', 'Casa');
  newForm('familia', 'Família');
  newForm('materia', 'Matérias');
  newForm('radio', 'Avaliação');
  newForm('textarea', 'Observações');
});

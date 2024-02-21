export const getAddress = () => {
  const cep = document.getElementsByClassName('cep-input')[0].value;
  const req1 = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const req2 = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  return Promise.any([req1, req2]).then(async (result) => {
    const address = await result.json();
    return {
      address: address.address || address.street,
      district: address.district || address.neighborhood,
      state: address.state,
      city: address.city,
    };
  }).catch(() => null);
};

export const searchCep = async () => {
  const address = await getAddress();
  const addressElement = document.getElementsByClassName('cart__address')[0];
  if (address) {
    addressElement.innerHTML = `${address.address} - ${address.district}`;
    addressElement.innerHTML += ` - ${address.city} - ${address.state}`;
  } else {
    addressElement.innerHTML = 'CEP não encontrado';
  }
};

// Remova os comentários a medida que for implementando as funções

export const searchCities = (term) => {
  return fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${import.meta.env.VITE_TOKEN}&q=${term}`)
    .then((response) => {
      return response.json().then((data) => {
        if (data.length === 0) window.alert('Nenhuma cidade encontrada');
        return data;
      });
    });
};

export const getWeatherByCity = (cityURL) => {
  return fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${import.meta.env.VITE_TOKEN}&q=${cityURL}`)
    .then((response) => {
      return response.json().then((data) => {
        return {
          name: data.location.name,
          country: data.location.country,
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          url: cityURL,
        };
      });
    });
};

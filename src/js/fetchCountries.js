// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery), возвращающей промис с массивом стран, результат запроса к API.
// import '../css/styles.css';
const BASE_URL = 'https://restcountries.eu/rest/v2/';

function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(response =>
    response.json(),
  );
}

export default { fetchCountries };

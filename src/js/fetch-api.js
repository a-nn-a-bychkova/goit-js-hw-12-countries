import debounce from 'lodash.debounce';
import API from './fetchCountries';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error } from '@pnotify/core';

const inputEl = document.querySelector('#searchQuery');
const output = document.querySelector('.js-output');
console.log(inputEl.value);
console.log(output.textContent);
inputEl.addEventListener('input', debounce(onInputWrite, 500));

function onInputWrite(e) {
  e.preventDefault();
  let searchQuery;
  const field = e.target;

  searchQuery = inputEl.value;
  API(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => field.reset);
}

function renderCountryCard(countries) {
  console.log(countries);
  console.log(countries.length);
  if (countries.length == 1) {
    console.log('we got it');
    const markup = countryCardTpl(countries);
  } else if (countries.length > 1 && countries.length <= 10) {
    console.log('these are less than 11 countries');
  }

  console.log('слишком много стран');
}

function onFetchError() {
  alert('Что-то пошло не так');
}

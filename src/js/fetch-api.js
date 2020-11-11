import '../css/styles.css';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

import '@pnotify/core/dist/PNotify.css';

import '@pnotify/core/dist/BrightTheme.css';
import { alert, info, error, defaultModules } from '@pnotify/core';

const inputEl = document.querySelector('#searchQuery');
const cardContainerEl = document.querySelector('.js-card-container');
console.log(cardContainerEl);
console.log(inputEl.value);

inputEl.addEventListener('input', debounce(onInputWrite, 500));
cardContainerEl.innerHTML = '';
function onInputWrite(e) {
  e.preventDefault();
  let searchQuery;
  const field = e.target;
  cardContainerEl.innerHTML = '';
  searchQuery = inputEl.value;
  // console.log('this is searchQuery', searchQuery);
  // if (searchQuery == '') {
  //   cardContainerEl.innerHTML = '';
  //   return;
  // }
  API(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => field.reset);
}

function renderCountryCard(countries) {
  // console.log(countries);
  // console.log(countries.length);
  if (countries.length == 1) {
    // console.log('we got it');
    cardContainerEl.innerHTML = countryCardTpl(countries[0]);
  } else if (countries.length > 1 && countries.length <= 10) {
    // console.log('these are less than 11 countries');
    cardContainerEl.innerHTML = countryListTpl(countries);
  } else if (countries.length > 10) {
    error({
      text: 'Too many matches found.Please enter a more specific query!',
      maxTextHeight: null,
      sticker: false,
    });
  }
}

function onFetchError() {
  console.log('nooo');
}

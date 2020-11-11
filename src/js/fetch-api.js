import '../css/styles.css';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error } from '@pnotify/core';

const inputEl = document.querySelector('#searchQuery');
const cardContainerEl = document.querySelector('.js-card-container');
console.log(cardContainerEl);
console.log(inputEl.value);

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
    const markup = countryCardTpl(countries[0]);
    cardContainerEl.innerHTML = markup;
  } else if (countries.length > 1 && countries.length <= 10) {
    console.log('these are less than 11 countries');
    const markupList = countryListTpl(countries);
    cardContainerEl.innerHTML = markupList;
  } else if (countries.length > 10) {
    alert({
      text: "Notice that's positioned in its own stack.",
      stack: new Stack({
        dir1: 'down',
        dir2: 'right', // Position from the top left corner.
        firstpos1: 90,
        firstpos2: 90, // 90px from the top, 90px from the left.
      }),
    });
  }
}

function onFetchError() {
  alert('we can not find this country');
}

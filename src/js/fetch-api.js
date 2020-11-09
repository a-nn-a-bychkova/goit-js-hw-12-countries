var debounce = require('lodash.debounce');
import API from './fetchCountries';
import getRefs from './get-refs';

API('uk').then(countries => {
  console.log(countries);
});

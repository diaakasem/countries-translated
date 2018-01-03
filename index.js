'use strict';

const translate = require('google-translate-api');
const _ = require('lodash');
let countries = require('./countries.json');


//countries = {'AD': countries.AD};
Promise.all(
    _.map(countries, (country, key)=> {
        return translate(country.name, {to: 'ar'}).then((res)=> {
            if (!country.translations) {
                country.translations = {};
            }
            country.translations.ar = res.text;
            return country
        }).catch(err => {
            console.error(err);
        });
    })
).then((allCountries)=> {
    console.log(allCountries);
});

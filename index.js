'use strict';

const translate = require('google-translate-api');
const _ = require('lodash');
let countries = require('./countries.json');
const fs = require('fs');

function processCountry(country, key) {
    return translate(country.name, {to: 'ar'}).then((res)=> {
        if (!country.translations) {
            country.translations = {};
        }
        country.key = key;
        country.translations.en = country.name;
        country.translations.ar = res.text;
        return country
    }).catch(err => {
        console.error(err);
        return err;
    });
}

//countries = {'AD': countries.AD};
let promises = _.map(countries, processCountry);
Promise.all(promises).then((allCountries)=> {
    let json = JSON.stringify(allCountries, null, 2);
    console.log(json);
    return fs.writeFileSync('countries-list.json', json);
}).catch((err)=> {
    console.error(err);
});

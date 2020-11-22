document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const tabs = require('./modules/tabs');
    const cards = require('./modules/cards');
    const forms = require('./modules/forms');
    const modal = require('./modules/modal');
    const slider = require('./modules/slider');
    const timer = require('./modules/timer');
    const calc = require('./modules/calc');

    tabs();
    cards();
    forms();
    modal();
    slider();
    timer();
    calc();

});
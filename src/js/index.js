"use strict";

var style = require('../scss/style.scss');
var readyContactForm = require('./contact-form');

var alert = require('bootstrap/js/dist/alert');
var fontawesome = require('@fortawesome/fontawesome');
var faExtLink = require('@fortawesome/fontawesome-pro-solid/faExternalLinkAlt');


readyContactForm('contactForm');
fontawesome.library.add(faExtLink);

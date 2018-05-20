"use strict";

import 'bootstrap/js/dist/alert';
import fontawesome from '@fortawesome/fontawesome';
import faExternalLinkAlt from '@fortawesome/fontawesome-pro-solid/faExternalLinkAlt';

import '../scss/style.scss';
import readyContactForm from './contact-form';

fontawesome.library.add(faExternalLinkAlt);
try {
  readyContactForm('contactForm');
} catch(e) {
  console.error(e);
}

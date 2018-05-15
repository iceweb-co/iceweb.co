"use strict";

import 'bootstrap/js/dist/alert';
import fontawesome from '@fortawesome/fontawesome';
import faExternalLinkAlt from '@fortawesome/fontawesome-pro-solid/faExternalLinkAlt';

import './style.scss';
import readyContactForm from './contact-form';


readyContactForm('contactForm');
fontawesome.library.add(faExternalLinkAlt);

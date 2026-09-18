// Text shown in the left column. Strings that are translation keys live in
// src/i18n/translations.js; the rest is shown as-is.
import avatar from '../assets/images/pp.jpg';

export const funFacts = ['facts.1', 'facts.2', 'facts.3', 'facts.4', 'facts.5'];

export const aboutMe = {
  avatar,
  name: 'Rayane',
  bio: [
    { text: 'about.bio1' },
    { text: 'about.city' },
    { text: 'about.bio2' },
    { text: 'about.embedded', strong: true },
    { text: 'about.bio3' },
    { text: 'about.software', strong: true },
    { text: '.' }
  ]
};

export const contact = {
  email: 'rayane.yazid.pro@gmail.com'
};

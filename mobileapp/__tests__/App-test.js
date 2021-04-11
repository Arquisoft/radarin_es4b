/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import getText from '../src/i18n.js';
import { getLanguages } from 'react-native-i18n';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});


it('applies the expected language', () => {

  getLanguages().then(languages => {
    if (languages == 'en')
      expect(getText('location')
      ).toBe('Send my location');

    else if (languages == 'es')
      expect(getText('location')
      ).toBe('Enviar mi ubicación');

  });
});

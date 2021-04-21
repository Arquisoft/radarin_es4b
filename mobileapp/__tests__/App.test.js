/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import App from '../App';
 import getText, {getDateTimeString} from '../src/i18n.js';
 import {currentlLocale} from 'react-native-i18n';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 
 test('app renders correctly', () => {
   const app = renderer.create(<App />).toJSON();
   expect(app).toMatchSnapshot();
 });
 
 test('applies the expected language', () => {
   if (currentlLocale() === 'en') {
     expect(getText('location')).toBe('Send my location');
   } else if (currentlLocale() === 'es')
     expect(getText('location')).toBe('Enviar mi ubicación');
 });
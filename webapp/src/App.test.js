import 'react-native';
import React from 'react';
import App from './App';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

test('app renders correctly', () => {
  const app = renderer.create(<App />).toJSON();
  expect(app).toMatchSnapshot();
});

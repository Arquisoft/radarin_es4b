/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import getText from '../src/i18n.js';
import {currentlLocale} from 'react-native-i18n';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import LoginForm from '../src/components/LoginForm';
import LoggedInView from '../src/components/LoggedInView';

test('app renders correctly', () => {
  renderer.create(<App />);
});

test('applies the expected language', () => {
  if (currentlLocale() === 'en')
    expect(getText('location')).toBe('Send my location');
  else if (currentlLocale() === 'es')
    expect(getText('location')).toBe('Enviar mi ubicación');
});

test('log in form renders correctly', () => {
  const changeUser = user => {
    console.log(user);
  };

  const logInForm = renderer
    .create(<LoginForm changeUser={changeUser}></LoginForm>)
    .toJSON();
  expect(logInForm).toMatchSnapshot();
});

test('user with valid credentials can log in', async done => {
  const expectUser = {
    webId: 'https://davidaf.solidcommunity.net/profile/card#me',
    name: 'David Álvarez',
    photo: 'https://davidaf.solidcommunity.net/profile/fotosolid.png',
  };

  fetch.mockResponseOnce(JSON.stringify(expectUser), {status: 200});

  const changeUser = user => {
    expect(JSON.stringify(user)).toBe(JSON.stringify(expectUser));
    done();
  };

  const {getByPlaceholderText, getByText} = render(
    <LoginForm changeUser={changeUser}></LoginForm>,
  );
  fireEvent.changeText(
    getByPlaceholderText(getText('providerPlaceholder')),
    'https://solidcommunity.com',
  );
  fireEvent.changeText(
    getByPlaceholderText(getText('usernamePlaceholder')),
    'david',
  );
  fireEvent.changeText(
    getByPlaceholderText(getText('passwordPlaceholder')),
    '1234',
  );

  await act(async () => {
    fireEvent.press(getByText(getText('enviar')));
  });
});

test('user with invalid credentials cant log in', async () => {
  fetch.mockResponseOnce('Error', {status: 403});

  const currentUser = null;

  const changeUser = user => {
    fail('it should not reach here');
    currentUser = user;
  };

  const {getByPlaceholderText, getByText} = render(
    <LoginForm changeUser={changeUser}></LoginForm>,
  );
  fireEvent.changeText(
    getByPlaceholderText(getText('providerPlaceholder')),
    'https://provider.com',
  );
  fireEvent.changeText(
    getByPlaceholderText(getText('usernamePlaceholder')),
    'Pepito',
  );
  fireEvent.changeText(
    getByPlaceholderText(getText('passwordPlaceholder')),
    '7777',
  );
  await act(async () => {
    fireEvent.press(getByText(getText('enviar')));
  });

  // Comprueba que el usuario no se ha cambiado
  expect(currentUser).toBe(null);
});

test('logged in view renders correctly', () => {
  const currentUser = {
    webId: 'https://davidaf.solidcommunity.net/profile/card#me',
    name: 'David Álvarez',
    photo: 'https://davidaf.solidcommunity.net/profile/fotosolid.png',
  };

  const changeUser = user => {
    fail('it should not reach here');
    currentUser = user;
  };

  const loggedInView = renderer
    .create(
      <LoggedInView user={currentUser} changeUser={changeUser}></LoggedInView>,
    )
    .toJSON();
  expect(loggedInView).toMatchSnapshot();
});

test('user can log out', async done => {
  const currentUser = {
    webId: 'https://davidaf.solidcommunity.net/profile/card#me',
    name: 'David Álvarez',
    photo: 'https://davidaf.solidcommunity.net/profile/fotosolid.png',
  };

  const changeUser = user => {
    expect(user).toBe(null);
    done();
  };

  const {getByText} = render(
    <LoggedInView user={currentUser} changeUser={changeUser}></LoggedInView>,
  );

  await act(async () => {
    fireEvent.press(getByText(getText('logOut')));
  });
});

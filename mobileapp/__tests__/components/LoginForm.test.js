/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import getText from '../../src/i18n.js';
 import {storeObject} from '../../src/storage.js';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 import {render, fireEvent, waitFor} from '@testing-library/react-native';
 import LoginForm from '../../src/components/LoginForm';
 import AppContent from '../../src/components/AppContent';
 
 const expectUser = {
    token: 'tokenDelUsuario',
    webId: 'https://davidaf.solidcommunity.net/profile/card#me',
    name: 'David Álvarez',
    photo: 'https://davidaf.solidcommunity.net/profile/fotosolid.png',
 };

 test('log in form renders correctly', () => {
    const changeUser = user => {
      console.log(user);
    };
  
    const logInForm = renderer
      .create(<LoginForm changeUser={changeUser}></LoginForm>)
      .toJSON();
    expect(logInForm).toMatchSnapshot();
  });
  
  test('user with valid credentials can log in', async () => {
    fetch.mockResponseOnce(JSON.stringify(expectUser), {status: 200});

    await storeObject('user', null);
  
    const {getByText, getByPlaceholderText} = render(<AppContent />);
    await waitFor(() => {
      getByText(getText('enviar'));
    });
  
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
    fireEvent.press(getByText(getText('enviar')));
  
    // Comprueba que el usuario accede a la vista de usuario logeado
    await waitFor(() => {
      getByText(expectUser.name);
    });
  });
  
  test('user with invalid credentials cant log in', async () => {
    fetch.mockResponseOnce('Error', {status: 403});
  
    await storeObject('user', null);
  
    const {getByPlaceholderText, getByText} = render(
      <AppContent />,
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
  
    fireEvent.press(getByText(getText('enviar')));
  
    // Comprueba que no ha pasado ha la vista de usuario logeado
    await waitFor(() => {
      getByText(getText('enviar'));
    });
  });
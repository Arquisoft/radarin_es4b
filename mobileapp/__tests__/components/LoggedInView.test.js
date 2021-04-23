/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import getText from '../../src/i18n.js';
 import {storeObject, storeSecretValue} from '../../src/storage.js';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 import {render, fireEvent, waitFor} from '@testing-library/react-native';
 import LoggedInView from '../../src/components/LoggedInView';
 import AppContent from '../../src/components/AppContent';
 import {hashCode} from '../../src/utils.js';
 
 const expectUser = {
   webId: 'https://davidaf.solidcommunity.net/profile/card#me',
   name: 'David Álvarez',
   photo: 'https://davidaf.solidcommunity.net/profile/fotosolid.png',
 };

 test('logged in view renders correctly', () => {  
    const loggedInView = renderer
      .create(
        <LoggedInView user={expectUser} changeUser={() => {}}></LoggedInView>,
      )
      .toJSON();
    expect(loggedInView).toMatchSnapshot();
  });
  
  test('user can log out', async () => {
    await storeObject('user', expectUser);
    await storeSecretValue(
      `${hashCode(expectUser.webId)}-token`, 
      'tokenDelUsuario'
      );

    const {getByText} = render(<AppContent />);
  
    await waitFor(() => {
      getByText(expectUser.name);
    });
  
    fireEvent.press(getByText(getText('logOut')));
  
    // Comprueba que sale de la vista de usuario logeado
    await waitFor(() => {
      getByText(getText('enviar'));
    });
  });
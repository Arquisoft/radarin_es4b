const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/register-form.feature');

defineFeature(feature, test => {

  function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  beforeEach(async () => {
    await global.page.goto('http://localhost:3000');
  })

  test('The user is not registered in the site and wants to see his friends list', ({ given, when, then }) => {

    let webID;
    let username;
    let password;

    given('An unregistered user', () => {
      webID = "https://testpodasw.solidcommunity.net/profile/card#me";
      username = "testpodasw";
      password = "TestTest1?";
    });

    when('The user registers in the application', async () => {

      // Cambiamos el idioma a español 
      await expect(page).toClick('button', { text: 'Idioma' || 'Language' });
      await expect(page).toClick('a', { text: 'Español' || 'Spanish' });
      await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 0 });

      // Accedemos a la ventana de inicio de sesión  
      newPagePromise = new Promise(x => page.once('popup', x));
      await expect(page).toClick('a', { text: 'Iniciar sesión' });
      await expect(page).toClick('button', { text: 'Accede con tu POD' });
      popup = await newPagePromise;

      // Introducimos los datos de incio de sesión 
      await expect(popup).toFill('input[type="url"]', webID);
      await expect(popup).toClick('[type="submit"]');
      await wait(6000);
      await expect(popup).toFill('input[name="username"]', username);
      await expect(popup).toFill('input[name="password"]', password);
      await expect(popup).toClick('[id="login"]');
      await wait(6000);

    });

    then('The user will access to his friends list', async () => {
      // Accedemos a la sección de amigos
      await expect(page).toClick('a', { text: 'Listar amigos' });

      await wait(6000);
      await expect(page).toMatch('Alberto');
      await expect(page).toMatch('David Álvarez');
      await expect(page).toMatch('Jonathan');
      await expect(page).toMatch('moises');
      
    });
  });

});
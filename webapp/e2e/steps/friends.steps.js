const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/friends.feature');

defineFeature(feature, test => {

  function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  beforeAll(async () => {
    await global.page.goto('http://localhost:3000/logIn')
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

    when('The user registers in the application and accesses his list of friends', async () => {

      // Accedemos a la ventana de inicio de sesión  
      newPagePromise = new Promise(x => page.once('popup', x));
      await expect(page).toClick('button', { text: 'Access with your POD' });
      popup = await newPagePromise;

      // Introducimos los datos de incio de sesión 
      await expect(popup).toFill('input[type="url"]', webID);
      await expect(popup).toClick('[type="submit"]');
      await wait(7000);
      await expect(popup).toFill('input[name="username"]', username);
      await expect(popup).toFill('input[name="password"]', password);
      await expect(popup).toClick('[id="login"]');
      await wait(7000);

      // Accedemos a la sección de amigos
      await page.goto('http://localhost:3000/amigos')

    });

    then('The user sees all his friends', async () => {
      // Comprobamos que aparecen todos los amigos del POD
      await wait(7000);
      await expect(page).toMatch('Alberto');
      await expect(page).toMatch('David Álvarez');
      await expect(page).toMatch('Jonathan');
      await expect(page).toMatch('moises');
    });
  });

});
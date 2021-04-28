const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/register-form.feature');

defineFeature(feature, test => {

  function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  beforeAll(async () => {
    await global.page.goto('http://localhost:3000/LogIn')
  })

  test('The user is not registered in the site', ({ given, when, then }) => {

    let webID;
    let username;
    let password;

    given('An unregistered user', () => {
      webID = "https://testpodasw.solidcommunity.net/profile/card#me";
      username = "testpodasw";
      password = "TestTest1?";
    });

    when('I fill the data in the form and press submit', async () => {

      // Accedemos a la ventana de inicio de sesión  
      newPagePromise = new Promise(x => page.once('popup', x));
      await expect(page).toClick('button', { text: 'Access with your POD' });
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

    then('A welcome message should be shown in the screen', async () => {

      // Accedemos a la sección de amigos
      await page.goto('http://localhost:3000/amigos')

      await wait(6000);
      await expect(page).toMatch('Alberto');
      await expect(page).toMatch('David Álvarez');
      await expect(page).toMatch('Jonathan');
      await expect(page).toMatch('moises');
    });
  });

  test('The user is already registered in the site', ({ given, when, then }) => {

    given('An already registered user', () => {
    });

    when('I fill the data in the form and press submit', async () => {

    });

    then('An error message should be shown in the screen', async () => {
    });

  });
});
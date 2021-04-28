const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/register-form.feature');

defineFeature(feature, test => {

  beforeEach(async () => {
    await global.page.goto('http://localhost:3000')
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

      // Cambiamos el idioma a español 
      await expect(page).toClick('button', { text: 'Idioma' || 'Language' });
      await expect(page).toClick('a', { text: 'Español' || 'Spanish' });
      await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 0 });
    });

    then('A welcome message should be shown in the screen', async () => {
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
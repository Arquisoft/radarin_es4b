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


    });

    then('The user will access to his friends list', async () => {
    });
  });

});
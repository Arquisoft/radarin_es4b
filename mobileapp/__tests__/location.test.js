import * as CurrentUser from '../src/user.js';
import {
  getCurrentLocation,
  setForegroundLocationHandler,
} from '../src/location.js';

const expectedLocation = {
  coords: {latitude: 43, longitude: -5, altitude: 100},
  timestamp: 100,
};

/*test('location is sent correctly', done => {
  setForegroundLocationHandler(location => {
    expect(JSON.stringify(location)).toBe(JSON.stringify(expectedLocation));
    done();
  });

  CurrentUser.setToken('token');
  CurrentUser.setWebId('webid');

  fetch.mockResponseOnce('Location sent', {status: 200});
  getCurrentLocation();
});*/

test('banned user cant send location', done => {
  CurrentUser.setToken('token');
  CurrentUser.setWebId('webid');
  CurrentUser.setOnForegroundBanHandler(done);

  fetch.mockResponseOnce('Banned', {status: 403});
  getCurrentLocation();
});

import {
  getCurrentFriendsClose,
  setForegroundFriendsHandler,
  showNotifications,
} from '../src/friends.js';
import * as CurrentUser from '../src/user.js';
import {postNotification} from '../src/notifications';
import getText from '../src/i18n.js';

const friendsClose = [
  {
    URL: 'https://amigo1',
    nombre: 'amigo1',
    latitud: 43,
    longitud: -5,
    altitud: 100,
    distancia: 200,
    fecha: 100,
  },
  {
    URL: 'https://amigo2',
    nombre: 'amigo2',
    latitud: 43.4,
    longitud: -5.1,
    altitud: 230,
    distancia: 150,
    fecha: 10120,
  },
  {
    URL: 'https://amigo3',
    nombre: 'amigo3',
    latitud: 43.2,
    longitud: -5.9,
    altitud: 243,
    distancia: 50,
    fecha: 12333,
  },
];

test('friends update correctly', done => {
  setForegroundFriendsHandler(friends => {
    expect(JSON.stringify(friends)).toBe(JSON.stringify(friends));
    done();
  });

  CurrentUser.setWebId('https://user');
  CurrentUser.setLastUserLocation({coords: {latitude: 43, longitude: -5}});

  fetch.mockResponseOnce(JSON.stringify(friendsClose), {status: 200});
  getCurrentFriendsClose();
});

test('notifications show correctly', done => {
  const friendsCloseUpdated = friendsClose.slice();
  friendsCloseUpdated[0] = {
    URL: 'https://amigo1',
    nombre: 'amigo1',
    latitud: 43,
    longitud: -5,
    altitud: 100,
    distancia: 220,
    fecha: 100,
  };

  postNotification.mockImplementation((message, id, channelId) => {
    expect(message).toBe(
      friendsCloseUpdated[0].nombre +
        getText('friendClose') +
        friendsCloseUpdated[0].distancia.toFixed() +
        getText('friendDistance'),
    );
    done();
  });

  showNotifications(friendsCloseUpdated);
});

test('banned user cant list friends', done => {
  setForegroundFriendsHandler(friends => {
    done.fail("shouldnt reach here")
  });

  CurrentUser.setOnForegroundBanHandler(done);

  fetch.mockResponseOnce("Banned", {status: 403});
  getCurrentFriendsClose();
});

import BackgroundTimer from 'react-native-background-timer';
import {getFriendsClose} from './api/api.js';
import * as CurrentUser from './user.js';
import {AppState} from 'react-native';
import {clearNotfications, postNotification} from './notifications.js';
import getText from './i18n.js';

let maxDistance = 100;
let foregroundFriendsHandler = () => {};

export function getCurrentFriendsClose() {
  if (CurrentUser.getLastUserLocation() && CurrentUser.getWebId()) {
    console.log('Getting close friends...');
    getFriendsClose(
      CurrentUser.getWebId(),
      CurrentUser.getLastUserLocation(),
      maxDistance,
    )
      .then(results => {
        console.log(results);
        if (AppState.currentState === 'active') {
          foregroundFriendsHandler(results);
        } else {
          clearNotfications();
          results.forEach(friend =>
            postNotification(
              friend.nombre +
                getText('friendClose') +
                friend.distancia.toFixed() +
                getText('friendDistance'),
            ),
          );
        }
      })
      .catch(err => console.log(err));
  }
}

export function startFriendUpdates() {
  BackgroundTimer.stopBackgroundTimer();
  BackgroundTimer.runBackgroundTimer(getCurrentFriendsClose, 60000);
}

export function stopFriendUpdates() {
  BackgroundTimer.stopBackgroundTimer();
}

export function setForegroundFriendsHandler(handleUpdateOnForeground) {
  foregroundFriendsHandler = handleUpdateOnForeground;
}

/**
 * Establece la distancia máxima para filtrar las notificaciones de amigos cercanos
 * @param {Number} distance
 */
export function setMaxDistance(distance) {
  maxDistance = distance;
}

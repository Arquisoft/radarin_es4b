import BackgroundTimer from 'react-native-background-timer';
import {getFriendsClose} from './api/api.js';
import * as CurrentUser from './user.js';
import {AppState} from 'react-native';
import {clearNotfications, postNotification} from './notifications.js';
import getText from './i18n.js';

let maxDistance = 100;

export function startFriendUpdates(handleUpdateOnForeground) {
  BackgroundTimer.stopBackgroundTimer();
  BackgroundTimer.runBackgroundTimer(() => {
    if (CurrentUser.getLastUserLocation() && CurrentUser.getWebId()) {
      console.log('Getting close friends...');
      getFriendsClose(
        CurrentUser.getWebId(),
        CurrentUser.getLastUserLocation(),
        maxDistance,
      )
        .then(results => {
          console.log(results);
          clearNotfications();
          results.forEach(friend =>
            postNotification(
              friend.nombre +
                getText('friendClose') +
                friend.distancia.toFixed() +
                getText('friendDistance'),
            ),
          );
          if (AppState.currentState === 'active') {
            handleUpdateOnForeground(results);
          }
        })
        .catch(err => console.log(err));
    }
  }, 10000);
}

export function stopFriendUpdates() {
  BackgroundTimer.stopBackgroundTimer();
}

/**
 * Establece la distancia máxima para filtrar las notificaciones de amigos cercanos
 * @param {Number} distance
 */
export function setMaxDistance(distance) {
  maxDistance = distance;
}

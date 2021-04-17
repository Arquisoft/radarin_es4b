import BackgroundTimer from 'react-native-background-timer';
import {getFriendsClose} from './api/api.js';
import * as CurrentUser from './user.js';
import {AppState} from 'react-native';
import {clearNotfications, postNotification} from './notifications.js';
import getText from './i18n.js';

let maxDistance = 100;
let foregroundFriendsHandler = () => {};
let lastFriends = [];

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
          showNotifications(results);
        }
        lastFriends = results;
      })
      .catch(err => console.log(err));
  }
}

// Para poder convertir el webId en identificador de notificación
String.prototype.hashCode = function () {
  let hash = 0, chr;
  if (this.length === 0) return hash;
  for (let i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function showNotifications(friends) {
  let friendsToNotify = friends.filter(friend => {
    return (
      lastFriends.filter(
        lastFriend =>
          lastFriend.URL === friend.URL &&
          Math.abs(lastFriend.distancia - friend.distancia) < 10,
      ).length == 0
    );
  });
  clearNotfications(
    friendsToNotify.map(friend => friend.URL.hashCode().toString()),
  );
  friendsToNotify.forEach(friend =>
    postNotification(
      friend.nombre +
        getText('friendClose') +
        friend.distancia.toFixed() +
        getText('friendDistance'),
      friend.URL.hashCode(),
    ),
  );
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

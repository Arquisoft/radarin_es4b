import BackgroundTimer from 'react-native-background-timer';
import {getFriendsClose} from './api/api.js';
import * as CurrentUser from './user.js';
import {AppState} from 'react-native';
import {
  createChannel,
  clearNotfications,
  postNotification,
  addOnNotificationCallback,
} from './notifications.js';
import getText from './i18n.js';
import {hashCode} from './utils.js'

const NOTIFICATION_CHANNEL_ID = 'friends-channel';

let maxDistance = 100;
let foregroundFriendsHandler = () => {};
let lastFriends = [];

createChannel(NOTIFICATION_CHANNEL_ID, getText('friendsChannelName'));

export function getCurrentFriendsClose() {
  if (CurrentUser.getLastUserLocation() && CurrentUser.getWebId()) {
    console.log('Getting close friends...');
    getFriendsClose(
      CurrentUser.getToken(),
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

export function showNotifications(friends) {
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
    friendsToNotify.map(friend => hashCode(friend.URL).toString()),
  );
  friendsToNotify.forEach(friend =>
    postNotification(
      friend.nombre +
        getText('friendClose') +
        friend.distancia.toFixed() +
        getText('friendDistance'),
      hashCode(friend.URL),
      NOTIFICATION_CHANNEL_ID,
    ),
  );
}

/**
 * Inicia las actualizaciones de amigos
 */
export function startFriendUpdates() {
  BackgroundTimer.stopBackgroundTimer();
  BackgroundTimer.runBackgroundTimer(getCurrentFriendsClose, 60000);
}

/**
 * Para las actualizaciones de amigos
 */
export function stopFriendUpdates() {
  BackgroundTimer.stopBackgroundTimer();
}

/**
 * Establece el callback que se ejecutará cuando se notifiquen nuevos amigos
 * y la aplicación esté en primer plano
 * @param {(friends: {
 *  URL: String,
 *  nombre: String,
 *  latitud: Number,
 *  longitud: Number,
 *  altitud: Number,
 *  distancia: Number,
 *  fecha: String,
 * }[]) => void} handleUpdateOnForeground callback que se ejecutará si la aplicación está en
 * primer plano
 */
export function setForegroundFriendsHandler(handleUpdateOnForeground) {
  foregroundFriendsHandler = handleUpdateOnForeground;
}

/**
 * Establece el callback que se ejecutará cuando el usuario abra la notificación
 * de un amigo cercano
 * @param {(friend: {
 *  URL: String,
 *  nombre: String,
 *  latitud: Number,
 *  longitud: Number,
 *  altitud: Number,
 *  distancia: Number,
 *  fecha: String,
 * }) => void} callback callback que se ejecutará cuando el usuario abra la notificación
 */
export function setOnFriendNotificationCallback(callback) {
  addOnNotificationCallback(NOTIFICATION_CHANNEL_ID, notification => {
    let friend = lastFriends.filter(
      lastFriend => hashCode(lastFriend.URL).toString() === notification.id,
    )[0];
    if (friend) callback(friend);
  });
}

/**
 * Establece la distancia máxima para filtrar las notificaciones de amigos cercanos
 * @param {Number} distance
 */
export function setMaxDistance(distance) {
  maxDistance = distance;
}

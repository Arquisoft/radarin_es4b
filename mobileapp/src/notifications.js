import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

let onNotifcationCallbacks = new Map();

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    
    if(onNotifcationCallbacks.has(notification.channelId)) {
      onNotifcationCallbacks.get(notification.channelId)(notification);
    }

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  requestPermissions: Platform.OS === 'ios',
});

/**
 * Crea un calnal de notificaciones
 * @param {string} id id del canal
 * @param {string} name nombre del canal
 */
export function createChannel(id, name) {
  PushNotification.channelExists(id, exists => {
    if (!exists) {
      PushNotification.createChannel(
        {
          channelId: id,
          channelName: name,
        },
        created => {
          if (created) console.log(`Notification channel ${name} created`);
        },
      );
    } else console.log(`Notification channel ${name} already created`);
  });
}

/**
 * Añade un callback al que se llamará cuando se abra una notificación de un
 * canal determinado
 * @param {string} channelId id del canal
 * @param {(notification: Omit<
 *    import('react-native-push-notification').ReceivedNotification, 
 *    'userInfo'
 *  >) => void}  callback  callback llamado cuando el usuario abre la notificación
 */
export function addOnNotificationCallback(channelId, callback) {
  onNotifcationCallbacks.set(channelId, callback);
}

/**
 * Muestra una notificación local
 * @param {String} message mensaje de la notificación
 * @param {String} id identificador de la notificación
 * @param {String} channelId identificador del canal
 */
export function postNotification(message, id, channelId) {
  PushNotification.localNotification({
    id,
    channelId,
    ignoreInForeground: false,
    title: 'Radarin',
    message,
  });
}

/**
 * Borra las notificaciones especificadas
 * @param {String[]} ids identificadores de las notificaciones
 */
export function clearNotfications(ids) {
  PushNotification.removeDeliveredNotifications(ids);
}

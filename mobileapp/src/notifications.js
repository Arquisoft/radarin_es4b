import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import getText from './i18n.js';

const LOCATION_CHANNEL_ID = 'location-channel';

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  requestPermissions: Platform.OS === 'ios',
});

PushNotification.channelExists(LOCATION_CHANNEL_ID, exists => {
  if (!exists) {
    PushNotification.createChannel(
      {
        channelId: LOCATION_CHANNEL_ID,
        channelName: getText('channelName'),
      },
      created => {
        if (created) console.log('Notification channel created');
      },
    );
  } else console.log('Notification channel already created');
});

export function postNotification(message) {
  PushNotification.localNotification({
    channelId: LOCATION_CHANNEL_ID,
    ignoreInForeground: false,
    title: 'Radarin',
    message,
  });
}

export function clearNotfications() {
  PushNotification.removeAllDeliveredNotifications();
}

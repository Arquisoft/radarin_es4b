import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { sendLocation } from './api/api.js';
import I18n from 'react-native-i18n';


I18n.fallbacks = true;

I18n.translations = {
  es: {
    "webid": "'Radarin está usando tu localización"
  },
  en: {
    "webid": "Radarin is using your location"
  },
};

const LOCATION_TASK_NAME = 'background_location_task';
let selectedWebId = undefined;

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  if (error) {
    locationErrorHandler(error);
  } else {
    handleLocation(locations.sort(location => location.timestamp)[0]);
  }
});

function handleLocation(location) {
  console.log(location);
  console.log(selectedWebId);
  if (selectedWebId) sendLocation(selectedWebId, location);
}

function locationErrorHandler(error) {
  console.log(error);
}

export function subscribe(webId) {
  selectedWebId = webId;
  Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(started => {
    if (!started) {
      Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        foregroundService: {
          notificationTitle: 'Radarin',
          notificationBody:  I18n.t('webid') ,
        },
      }).then(() => console.log('Subscribed'));
    }
  });
}

export function unsubscribe() {
  Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(started => {
    if (started) {
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).then(() =>
        console.log('Unsubscribed'),
      );
    }
  });
}

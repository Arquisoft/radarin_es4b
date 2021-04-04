import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {sendLocation} from './api/api.js';

const LOCATION_TASK_NAME = 'background_location_task';
let selectedWebId = undefined;

TaskManager.defineTask(LOCATION_TASK_NAME, ({data: {locations}, error}) => {
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
          notificationBody: 'Radarin está usando tu localización',
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

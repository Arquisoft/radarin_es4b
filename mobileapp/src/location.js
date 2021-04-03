import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {sendLocation} from './api/api.js';

const LOCATION_TASK_NAME = 'background_location_task';
let selectedWebId = undefined;

TaskManager.defineTask(LOCATION_TASK_NAME, ({data: {locations}, error}) => {
  if (error) {
    errorHandler(error);
  } else {
    handleLocation(locations.sort(location => location.timestamp)[0]);
  }
});

export function setSelectedWebId(webId) {
    selectedWebId = webId;
}

function handleLocation(location) {
  console.log(location);
  console.log(selectedWebId);
  if (selectedWebId) sendLocation(selectedWebId, location);
}

export function locationErrorHandler(error) {
  console.log(error);
}

export function subscribe() {
  console.log('Subscribed');
  Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    foregroundService: {
      notificationTitle: 'Radarin',
      notificationBody: 'Radarin está usando tu localización',
    },
  }).then(() => console.log('Background task created'));
}
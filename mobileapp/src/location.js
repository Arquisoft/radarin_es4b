import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {sendLocation, getFriendsClose} from './api/api.js';
import getText from './i18n.js';
import {postNotification, clearNotfications} from './notifications';

const LOCATION_TASK_NAME = 'background_location_task';
let selectedWebId = undefined;
let maxDistance = 100;

function defineTaskIfNotDefined() {
  if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
    TaskManager.defineTask(LOCATION_TASK_NAME, ({data: {locations}, error}) => {
      if (error) {
        locationErrorHandler(error);
      } else {
        handleLocation(locations.sort(location => location.timestamp)[0]);
      }
    });
  }
}

function handleLocation(location) {
  console.log(location);
  console.log(selectedWebId);
  if (selectedWebId) {
    sendLocation(selectedWebId, location);
    getFriendsClose(selectedWebId, location, maxDistance).then(results => {
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
    });
  }
}

function locationErrorHandler(error) {
  console.log(error);
}

/**
 * Hace que la aplicación escuche las actualizaciones de ubicación
 * @param {String} webId webId del usuario actual
 */
export function subscribe(webId) {
  selectedWebId = webId;
  defineTaskIfNotDefined();
  Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(started => {
    if (!started) {
      Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        foregroundService: {
          notificationTitle: 'Radarin',
          notificationBody: getText('usingLocation'),
        },
      }).then(() => console.log('Subscribed'));
    }
  });
}

/**
 * Hace que la aplicación deje de escuchar las actualizaciones de ubicación
 */
export function unsubscribe() {
  Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(started => {
    if (started) {
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).then(() =>
        console.log('Unsubscribed'),
      );
    }
  });
}

/**
 * Comprueba si el servicio de ubicación está activado
 * @param {Function} enabledCallback función a la que se llamará si está activado
 * @param {Function} disabledCallback función a la que se llamará si no está activado
 */
export function checkLocationEnabled(enabledCallback, disabledCallback) {
  Location.hasServicesEnabledAsync().then(enabled => {
    enabled ? enabledCallback() : disabledCallback();
  });
}

/**
 * Establece la distancia máxima para filtrar las notificaciones de amigos cercanos
 * @param {Number} distance 
 */
export function setMaxDistance(distance) {
  maxDistance = distance;
}

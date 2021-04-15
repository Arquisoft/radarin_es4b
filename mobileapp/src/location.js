import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as CurrentUser from './user.js';
import {sendLocation} from './api/api.js';
import getText from './i18n.js';
import {AppState} from 'react-native';
import Toast from 'react-native-simple-toast';
import {checkAndRequestPermissions} from './permissions.js';
import {storeObject} from './storage.js';

const LOCATION_TASK_NAME = 'background_location_task';
let handleLocationOnForeground = () => {};

/**
 * Define la tarea en segundo plano si no se ha definido todavía
 */
export function defineTaskIfNotDefined() {
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
  let webId = CurrentUser.getWebId();
  console.log(location);
  console.log(webId);
  if (webId) {
    CurrentUser.setLastUserLocation(location);
    sendLocation(webId, location);
    storeObject(`${webId}-lastLocation`, location);
    if (AppState.currentState === 'active') {
      handleLocationOnForeground(location);
    }
  }
}

function locationErrorHandler(error) {
  console.log(error);
}

/**
 * Solicita la ubicación actual del usuario
 */
export function getCurrentLocation() {
  checkAndRequestPermissions(
    () =>
      checkLocationEnabled(
        () => {
          Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          })
            .then(location => handleLocation(location))
            .catch(locationErrorHandler);
        },
        () => Toast.show(getText('toastLocation')),
      ),
    err => console.log(err),
  );
}

/**
 * Hace que la aplicación escuche las actualizaciones de ubicación
 */
export function subscribe() {
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
 * Comprueba si la aplicación está suscrita a las actualizaciones de localización
 * @returns {Promise<Boolean>} promesa que se resuelve a `true` si está suscrita,
 *  o `false` si no
 */
export async function isSubscribed() {
  return await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
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
 * Establece el manejador que se ejecutará cuando se reciba una localización en primer plano
 * @param {(location: Location.LocationObject) => void} foregroundLocationHandler callback llamado
 * cuando se recibe una nueva localización y la aplicación está en primer plano
 */
export function setForegroundLocationHandler(foregroundLocationHandler) {
  handleLocationOnForeground = foregroundLocationHandler;
}

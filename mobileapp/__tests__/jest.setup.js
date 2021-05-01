import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mock from 'react-native-permissions/mock';
import mockTranslations from '../resources/translations.json';
import Promise from 'promise-polyfill';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('expo-secure-store', () => ({
  ...mockAsyncStorage,
  setItemAsync: mockAsyncStorage.setItem,
  getItemAsync: mockAsyncStorage.getItem,
}));

jest.mock('expo-location', () => ({
  getCurrentPositionAsync: jest.fn(async () => ({
    coords: {latitude: 43, longitude: -5, altitude: 100},
    timestamp: 100,
  })),
  Accuracy: {
    Highest: 10,
  },
  hasStartedLocationUpdatesAsync: jest.fn(async () => true),
  stopLocationUpdatesAsync: jest.fn(async () => true),
}));

jest.mock('react-native-permissions', () => {
  return mock;
});

jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
  show: jest.fn(),
}));

jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  onRegister: jest.fn(),
  onNotification: jest.fn(),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  channelExists: jest.fn(),
  removeDeliveredNotifications: jest.fn(),
}));

jest.mock('@react-native-community/push-notification-ios', () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  getInitialNotification: jest.fn(),
}));

jest.mock('react-native-i18n', () => ({
  t: jest.fn(key => mockTranslations.en[key]),
  currentlLocale: jest.fn(() => 'en'),
}));

jest.mock('react-native-background-timer', () => ({
  stopBackgroundTimer: jest.fn(),
  runBackgroundTimer: jest.fn(),
}));

jest.mock('react-native/Libraries/AppState/AppState', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  currentState: 'active',
}));

jest.mock('react-native-splash-screen', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

require('jest-fetch-mock').enableMocks();

jest.mock('../src/notifications');

jest.useFakeTimers();

global.Promise = Promise;

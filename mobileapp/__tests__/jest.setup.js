import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mock from 'react-native-permissions/mock';
import mockTranslations from '../resources/translations.json';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-permissions', () => {
  return mock;
});

jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
}));

jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  onRegister: jest.fn(),
  onNotification: jest.fn(),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  channelExists: jest.fn(),
}));

jest.mock('@react-native-community/push-notification-ios', () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(() => Promise.resolve()),
  getInitialNotification: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-i18n', () => ({
  t: jest.fn(key => mockTranslations.en[key]),
  currentlLocale: jest.fn(() => 'en'),
}));

jest.mock('react-native-background-timer', () => ({
  stopBackgroundTimer: jest.fn(),
  runBackgroundTimer: jest.fn(),
}));

require('jest-fetch-mock').enableMocks();

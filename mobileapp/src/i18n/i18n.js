import I18n from 'react-native-i18n';
import en from 'mobileapp/src/i18n/locale/en.js'
import es from 'mobileapp/src/i18n/locale/es.js'

I18n.fallbacks = true;

I18n.translation = {
  es,
  en
};

export default I18n;
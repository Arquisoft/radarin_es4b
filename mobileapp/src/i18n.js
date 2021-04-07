import I18n from 'react-native-i18n';

export default function getText(key) {
  I18n.fallbacks = true;

  I18n.translations = {
    es: {
      location: 'Enviar mi ubicación',
      toast: 'Por favor, activa la localización',
      webid: 'Escribe tu WebID:',
      enviar: 'Enviar',
    },
    en: {
      location: 'Send my location',
      toast: 'Please, enable the location service',
      webid: 'Write your WebID:',
      enviar: 'Send',
    },
  };
  return I18n.t(key);
}

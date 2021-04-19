import I18n from 'react-native-i18n';
import translations from '../resources/translations.json';

I18n.fallbacks = true;
I18n.translations = translations;

/**
 * Obtiene el texto asociado a una clave
 * @param {String} key clave asociada al texto
 * @returns {String} texto asociado a la clave
 */
export default function getText(key) {
  return I18n.t(key);
}

/**
 * Obtiene una string con la fecha y hora
 * @param {Date} date
 */
export function getDateTimeString(date) {
  return I18n.l('date.formats.full', date);
}

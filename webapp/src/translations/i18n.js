import I18n from 'i18next';
import enTranslation from './en.json'; 
import esTranslation from './es.json'; 

const resources = {
    en: {
        translation: enTranslation, 
    },
    es: {
        translation: esTranslation,
    }
}; 

I18n.init({
  resources,
  lng: 'es',
  keySeparator: false, 
  interpolation: {
      escapeValue: false,
  }
});

/**
 * Obtiene el texto asociado a una clave
 * @param {String} key clave asociada al texto
 * @returns {String} texto asociado a la clave
 */
export default function getText(key) {
  return I18n.t(key);
}


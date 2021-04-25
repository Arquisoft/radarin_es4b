import I18n from 'i18next';
import enTranslation from './en.json';
import esTranslation from './es.json';

if(!sessionStorage.getItem("lng")) {
    var lng = navigator.language || navigator.userLanguage;
    sessionStorage.setItem("lng",lng); 
}


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
    lng: sessionStorage.getItem("lng"),
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
export function getText(key) {
    return I18n.t(key);
}

/**
 * Cambia el idioma de la aplicación
 * @param {String} language código del idioma deseado
 */
export function changeLanguage(language) {
    sessionStorage.setItem("lng",language); 
    console.log(sessionStorage.getItem("lng"));
    window.location.reload(); 
}



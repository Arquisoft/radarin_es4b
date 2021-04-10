import I18n from 'react-native-i18n';

/**
 * Obtiene el texto asociado a una clave
 * @param {String} key clave asociada al texto
 * @returns {String} texto asociado a la clave
 */
export default function getText(key) {
  I18n.fallbacks = true;

  I18n.translations = {
    es: {
      location: 'Enviar mi ubicación',
      toastLocation: 'Por favor, activa la localización',
      usingLocation: 'Radarin está usando tu localización',
      provider: 'Proveedor de identidad de Solid:',
      providerPlaceholder: 'p. ej. https://solidcommunity.net',
      username: 'Nombre de usuario:',
      usernamePlaceholder: 'Nombre de usuario',
      password: 'Contraseña:',
      passwordPlaceholder: 'Contraseña',
      enviar: 'Enviar',
      logOut: 'Cerrar sesión',
      logIn: 'Iniciar sesión',
      loading: 'Cargando...',
      loginInfo:
        'Para usar Radarin necesitas tener un POD de Solid y haber añadido a https://solid-node-client como aplicación de confianza.',
      getAPod: 'Si no tienes un POD, puedes crear uno ',
      here: 'aquí',
      trustedApps:
        'Si no sabes como añadir aplicaciones de confianza, puedes encontrar más información ',
      toastLogIn: 'Datos incorrectos',
      channelName: 'Localización',
      friendClose: ' está a ',
      friendDistance: ' metros',
      maxDistance: 'Distancia máxima para notifiaciones de amigos:'
    },
    en: {
      location: 'Send my location',
      toastLocation: 'Please, enable the location service',
      usingLocation: 'Radarin is using your location',
      provider: 'Solid identity provider:',
      providerPlaceholder: 'e. g. https://solidcommunity.net',
      username: 'Username:',
      usernamePlaceholder: 'Username',
      password: 'Password:',
      passwordPlaceholder: 'Password',
      enviar: 'Send',
      logOut: 'Log out',
      logIn: 'Log in',
      loading: 'Loading...',
      loginInfo:
        'To use Radarin you need to have a Solid POD and have added https://solid-node-client as a trusted app',
      getAPod: "If you don't have a POD, you can get one ",
      here: 'here',
      trustedApps:
        "If you don't know how to add a trusted app, you can find more information ",
      toastLogIn: 'Invalid log in data',
      channelName: 'Location',
      friendClose: ' is ',
      friendDistance: ' meters away',
      maxDistance: 'Max distance for friend notifications:'
    },
  };
  return I18n.t(key);
}

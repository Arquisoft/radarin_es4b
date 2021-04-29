import getText from '../i18n.js';

const apiEndPoint = 'https://radarines4brestapi.herokuapp.com/api';

/**
 * Envía la localización del usuario
 * @param {String} token token del usuario
 * @param {*} location localización del usuario
 */
export async function sendLocation(token, location) {
  console.log(apiEndPoint);
  fetch(apiEndPoint + '/user/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      token,
      latitud: location.coords.latitude,
      longitud: location.coords.longitude,
      altitud: location.coords.altitude,
      fecha: location.timestamp,
    }),
  })
    .then(response => {
      if (response.status === 403) throw new Error(getText('toastBanned'));
      console.log(`Send location: ${response.status}`);
    })
    .catch(error => console.log(error));
}

/**
 * Busca amigos del usuario cercanos a su localización
 * @param {String} token token del usuario
 * @param {*} location localización del usuario
 * @param {Number} maxDistance distancia máxima de los amigos al usuario
 * @returns {Promise<{
 *  URL: String,
 *  nombre: String,
 *  foto: String,
 *  latitud: Number,
 *  longitud: Number,
 *  altitud: Number,
 *  distancia: Number,
 *  fecha: String,
 * }[]>} array de amigos cercanos
 */
export async function getFriendsClose(token, location, maxDistance) {
  console.log(apiEndPoint);
  let response;
  try {
    response = await fetch(apiEndPoint + '/user/friends/near', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token,
        latitud: location.coords.latitude,
        longitud: location.coords.longitude,
        maxDistancia: maxDistance,
      }),
    });
    console.log(`Friends close: ${response.status}`);
  } catch (err) {
    console.log(err);
    return;
  }
  if (response.status === 403) throw new Error(getText('toastBanned'));
  return await response.json();
}

/**
 * Autentica al usuario en solid
 * @param {{
 *  idp: String,
 *  username: String,
 *  password: String
 * }} credentials credenciales del usuario
 * @returns {Promise<{
 *  token: String,
 *  user: {
 *    webId: String,
 *    name: String,
 *    photo: String
 *  }
 * }>} información del usuario autenticado
 */
export async function authenticate(credentials) {
  console.log(apiEndPoint);
  let response;
  try {
    response = await fetch(apiEndPoint + '/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials),
    });
    console.log(`Log in: ${response.status}`);
  } catch (err) {
    console.log(err);
    return;
  }
  if (response.status === 403) throw new Error(getText('toastBanned'));
  if (response.status !== 200) throw new Error(getText('toastLogIn'));
  let {token, webId, name, photo} = await response.json();
  return {
    token,
    user: {
      webId,
      name,
      photo,
    },
  };
}

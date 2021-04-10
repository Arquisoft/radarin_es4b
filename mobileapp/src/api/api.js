const apiEndPoint = 'https://radarines4brestapi.herokuapp.com/api';

/**
 * Envía la localización del usuario
 * @param {String} URL webId del usuario 
 * @param {*} location localización del usuario
 */
export async function sendLocation(URL, location) {
  console.log(apiEndPoint);
  fetch(apiEndPoint + '/user/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      URL,
      latitud: location.coords.latitude,
      longitud: location.coords.longitude,
      altitud: location.coords.altitude,
      fecha: location.timestamp,
    }),
  })
    .then(response => console.log(`Send location: ${response.status}`))
    .catch(error => console.log(error));
}

/**
 * Busca amigos del usuario cercanos a su localización
 * @param {String} URL webId del usuario 
 * @param {*} location localización del usuario
 * @param {Number} maxDistance distancia máxima de los amigos al usuario
 * @returns {Promise<{
 *  URL: String, 
 *  nombre: String, 
 *  latitud: Number, 
 *  longitud: Number,  
 *  altitud: Number, 
 *  distancia: Number
 * }[]>} array de amigos cercanos
 */
export async function getFriendsClose(URL, location, maxDistance) {
  console.log(apiEndPoint);
  let response = await fetch(apiEndPoint + '/user/friends/near', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      URL,
      latitud: location.coords.latitude,
      longitud: location.coords.longitude,
      maxDistancia: maxDistance,
    }),
  });
  console.log(`Friends close: ${response.status}`);
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
 *  webId: String, 
 *  name: String,
 *  photo: String
 * }>} información del usuario autenticado
 */
export async function authenticate(credentials) {
  console.log(apiEndPoint);
  try {
    let response = await fetch(apiEndPoint + '/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials),
    });
    console.log(`Log in: ${response.status}`);
    return response.status === 200 ? await response.json() : false;
  } catch (err) {
    console.log(err);
  }
}

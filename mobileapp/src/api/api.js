const apiEndPoint = 'https://radarines4brestapi.herokuapp.com/api';

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

//Devuelve un array con objetos que tienen las siguientes propiedades:
// - nombre
// - latitud
// - longitud
// - altitud
// - fecha
// - URL
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


export async function sendLocation(URL, location){
    const apiEndPoint= 'https://radarines4brestapi.herokuapp.com/api'
    console.log(apiEndPoint);
    fetch(apiEndPoint + "/user/add", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          URL,
          latitud: location.coords.latitude,
          longitud: location.coords.longitude,
          altitud: location.coords.altitude,
          fecha: location.timestamp
        })
      }).then((response) => console.log(response.status)).catch((error) => console.log(error));
}

export async function authenticate(credentials){
  const apiEndPoint= 'https://radarines4brestapi.herokuapp.com/api'
  console.log(apiEndPoint);
  try {
    let response = await fetch(apiEndPoint + "/user/login", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(credentials)
    });
    console.log(response.status);
    return response.status === 200? await response.json() : false;
  } catch(err) {
    console.log(err);
  }
}
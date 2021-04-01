
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
      }).then((response) => console.log(response)).catch((error) => console.log(error));
}
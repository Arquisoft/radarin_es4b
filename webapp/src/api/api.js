
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production

//Devuelve un array con objetos que tienen las siguientes propiedades:
// - nombre
// - latitud
// - longitud
// - altitud
// - URL
export async function getFriends(URL){
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    console.log(apiEndPoint);
    let response = await fetch(apiEndPoint+'/user/friends', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'URL':URL})
      })
    return await response.json()
}
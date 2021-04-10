
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production

/**
 * Busca amigos del usuario
 * @param {String} URL webId del usuario
 * @returns {Promise<{
 *  URL: String, 
 *  nombre: String, 
 *  latitud: Number, 
 *  longitud: Number,  
 *  altitud: Number
 * }[]>} array de amigos del usuario
 */
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



export async function inyectSamples(){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  console.log(apiEndPoint);
  let response = await fetch(apiEndPoint+'/user/sample', {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
  return await response.json()
}
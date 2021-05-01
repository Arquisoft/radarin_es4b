
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production

/**
 * Busca amigos del usuario
 * @param {String} URL webId del usuario
 * @returns {Promise<{
 *  URL: String, 
 *  nombre: String,
 *  foto: String,
 *  latitud: Number, 
 *  longitud: Number,  
 *  altitud: Number,
 *  fecha: String,
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
export async function getUsers(){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  console.log(apiEndPoint);
  let response = await fetch(apiEndPoint+'/users', {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
  return await response.json()
}


export async function isBanUser(URL=""){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  console.log(apiEndPoint);
  let response = await fetch(apiEndPoint+'/user/banned', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'URL':URL})
    })

    console.log(URL);
    console.log(response);
  return await response.json()
}

export async function banUser(URL){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  console.log(apiEndPoint);
  let response = await fetch(apiEndPoint+'/user/ban', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'URL':URL})
    })
  return await response.json()
}

export async function sendLocation(URL){
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    console.log(apiEndPoint);
    let response = await fetch(apiEndPoint+'/user/friends', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'URL':URL})
      })
    return await response.json()
}
let webId = null;
let lastLocation = null;
let token = null;

/**
 * @returns {string} webid del usuario actual
 */
export function getWebId() {
    return webId;
}


/**
 * Establece el webId del usuario actual
 * @param {string} newWebId webId del usuario actual
 */
export function setWebId(newWebId) {
    webId = newWebId;
}

/**
 * @returns {Location} última ubicación del usuario
 */
export function getLastUserLocation() {
    return lastLocation;
}

/**
 * Establece la última ubicación del usuario actual
 * @param {Location} location última ubicación del usuario
 * actual
 */
export function setLastUserLocation(location) {
    lastLocation = location;
}

/**
 * @returns {string} token del usuario actual
 */
 export function getToken() {
    return token;
}


/**
 * Establece el token del usuario actual
 * @param {string} newToken token del usuario actual
 */
export function setToken(newToken) {
    token = newToken;
}

/**
 * Borra la información del usuario actual
 */
export function clear() {
    setWebId(null);
    setLastUserLocation(null);
    setToken(null);
}
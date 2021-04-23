
/**
 * Genera el código hash de un string
 * @param {String} strign 
 * @returns {number} código hash del string
 */
export const hashCode = function (strign) {
  let hash = 0,
    chr;
  if (strign.length === 0) return hash;
  for (let i = 0; i < strign.length; i++) {
    chr = strign.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

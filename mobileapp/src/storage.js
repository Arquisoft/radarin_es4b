import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStorage from 'expo-secure-store';

/**
 * Almacena un objeto con la clave especificada.
 * Si el objeto es null, borra el objeto almacenado con la clave.
 * @param {String} key clave
 * @param {*} object objeto
 */
export async function storeObject(key, object) {
  try {
    if(object) await AsyncStorage.setItem(key, JSON.stringify(object));
    else await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Recupera un objeto almacenado con la clave especificada
 * @param {String} key clave
 * @return {Promise<*>} Objeto almacenado 
 */
export async function getObject(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Almacena un valor con la clave especificada.
 * @param {String} key clave
 * @param {String} value valor
 */
 export async function storeValue(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };
  
  /**
   * Recupera un valor almacenado con la clave especificada
   * @param {String} key clave
   * @return {Promise<String>} valor almacenado 
   */
  export async function getValue(key) {
    try {
      return JSON.parse(await AsyncStorage.getItem(key));
    } catch (e) {
      console.log(e);
    }
  };

/**
 * Almacena un valor sensible con la clave especificada.
 * @param {String} key clave
 * @param {String} value valor
 */
 export async function storeSecretValue(key, value) {
  try {
    await SecureStorage.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Recupera un valor sensible almacenado con la clave especificada
 * @param {String} key clave
 * @return {Promise<String>} valor almacenado 
 */
export async function getSecretValue(key) {
  try {
    return JSON.parse(await SecureStorage.getItemAsync(key));
  } catch (e) {
    console.log(e);
  }
};

## La aplicación móvil
La aplicación móvil está desarrollada usando React Native. Para poder compilarla en Android lo primero que hay que hacer es preparar el entorno siguiendo [este tutorial](https://reactnative.dev/docs/environment-setup). 

Una vez configurado todo el entorno, hay que abrir una terminal e iniciar Metro de la siguiente manera:
```bash
cd mobileapp
npm start
```
Dejamos Metro corriendo en la primera terminal, abrimos otra terminal y compilamos la aplicación:
```bash
cd mobileapp
npm run android
```
Cualquier modificación que hagamos en el código a partir de ahora se verá reflejada en el móvil o emulador conectado. El log de JavaScript aparecerá en la terminal en la que ejecutamos Metro.

Para compilar la aplicación móvil en iOS se necesita usar MacOS como sistema opertivo.

# Prueba Técnica Salas

Esta prueba técnica simula un panel para el manejo de datos relacionados con el estado de las salas de un edificio.

## Pasos para arrancar el proyecto

Para el correcto funcionamiento de la aplicación, es necesario arrancar, en primer lugar, el servidor de json-server que se ha utilizado para simular la existencia de una API REST a la que realizar peticiones CRUD desde la aplicación. Para ello ejecutaremos el siguiente comando:

```
npm run jsonserver
```

Este comando ejecutará el servidor en el puerto 3000 por defecto. También aplicará un network delay simulado de 250ms para simular los tiempos de carga e intercambio de datos entre la aplicación y el servidor. Ambas opciones se pueden modificar en el archivo package.json.

En caso de modificar el puerto en el cual se ejecuta json-server, también sera necesario modificar la config VITE_API_URL del archivo .env para que apunte al nuevo puerto:

```
VITE_API_URL=http://localhost:3000
```

Una vez este servidor está funcionando y aceptando peticiones, podemos arrancar la aplicación principal en modo development y visitar la URL que aparecerá en pantalla:

```
npm run dev
```

## Explicación de las decisiones tomadas

Para el desarrollo de este proyecto se ha utilizado el entorno de desarrollo Vite.js y su template inicial de React + TypeScript.

### Librerías y herramientas utilizadas

- **Desarrollo**: TypeScript, ESLint, Prettier
- **Estilos**: TailwindCSS, tailwind-merge
- **Network**: Axios, react-query, json-server
- **Testing**: Vitest, React Testing Library

### API y manejo de datos

Los requisitos de la prueba incluía la obtención de los datos de las salas a través de una API mockeada, lo cual era un punto intermedio entre no realizar ningún tipo de petición de red en un extremo, y manejar todos los datos relacionados con las salas a través del uso de una API completa en el otro extremo. Decidí que sería buena idea utilizar json-server para simular de forma rápida y sencilla una API que aceptara todas las operaciones CRUD, e implementarlas en el front-end haciendo uso de React Query, y de esta forma tener una experiencia completa de manejo de datos en red y su persistencia, y no solo en memoria de forma temporal.

### Fuente Helvetica
En los recursos, se indicaba que la fuente utilizada en el diseño es Helvetica, pero al implementarla, pude comprobar que la fuente no encajaba con lo que se veía en la foto por motivos que desconozco, y de hecho el resultado era un tanto raro al usar esta fuente y consideré que en lugar de Helvetica, dejaría la fuente por defecto de TailwindCSS. En caso de querer comprobar la implementación con Helvetica, tan solo hay que descomentar la línea responsable en el archivo tailwind.config.js:

```
extend: {
  fontFamily: {
    // "sans": ["Helvetica"]
  },
},
```

## Dificultades encontradas

### Inputs numéricos

La mayoría de inputs de la aplicación son de tipo numérico y solo deberían aceptar números en su valor. Mi primer intento, y el que considero debería ser el standard para un caso sencillo como este, fue el de utilizar el atributo type="number" en los elementos input. En teoría, esto debería hacer que esos inputs solo acepten números en su valor, pero por algún motivo que desconozco, en mi navegador (Firefox en Ubuntu) no estaban funcionando correctamente. Después de comprobar que mi navegador era el problema, decidí que en lugar de utilizar el atributo type="number", debía controlar el valor en el propio código, e implementé un check sencillo para controlar al 100% que los valores introducidos solo eran de tipo numérico y no dejar esta responsabilidad al navegador, tapando así posibles problemas de compatibilidad.

### Modificar datos de sala

A la hora de implementar la funcionalidad para modificar los datos de una sala, tenía la sensación de que el diseño no era completamente intuitivo para hacer uso de esta funcionalidad, ya que existían los inputs numéricos con los datos de cada sala, y además un botón de "Modificar", pero faltaba algún tipo de feedback por parte de la aplicación para indicar cuando un input de una sala había sido modificado y estaba a la espera de aplicar los cambios mediante el uso del botón "Modificar", o, por el contrario, cuando los datos no habían sido modificados y el botón de "Modificar" no era utilizable en ese momento.

Una de las primeras formas de hacer esta interacción más intuitiva que pensé, fue la de deshabilitar el botón de "Modificar" hasta que algún input hubiera cambiado, y entonces el botón pasaría a estar habilitado y listo para confirmar los cambios. En un principio, esto habría sido suficiente, pero también se me ocurrió que sería buena idea dar la posibilidad de cambiar el nombre a una sala, y para ello necesitaría que el nombre también fuese un input, con lo cual estaría dejando de respetar el diseño que se pedía en el ejercicio y el resultado visual sería un poco raro.

Finalmente, decidí que lo mejor sería abrir un modal al hacer click en "Modificar" y que contuviera un formulario con todos los datos que se podían modificar relacionados con esa sala. Además, podía reutilizar esta funcionalidad a la hora de crear una nueva sala y la forma de realizar tanto la modificación como la creación de una sala pasaban a ser completamente intuitivas y fáciles de realizar para el usuario, sin dar pie a confusiones o errores humanos.
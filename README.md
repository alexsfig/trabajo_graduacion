# Proyecto trabajo de graduacion

[![N|vuejs](https://cdn6.aptoide.com/imgs/4/4/9/4495d03338c42a4374a48fa3aacd8881_icon.png?w=128)](https://vuejs.org)
Proyecto usando VUEJS


Estructura de carpetas
  - build (Por defecto usada por vuejs)
  - config(Configuraciones basicas)
  - node_modules(Aca se instalan los paquetes de node)
  - src (Aca esta todo el codigo que utilizarememos)
  - static (Por defecto usada por vuejs)

# Instalacion
  - Instalar nodejs 
  - Clonar proyecto
  - ```sh
    $ cd proyecto
    $ npm install 
    $ node run dev
    ```
    - Al correr npm run dev abrir el navegador y usar localhost:8081
 ```sh
localhots:8081
```
  

# Documentacion importante

> [Vuejs](https://vuejs.org) Documentacion del framework

> [Bootstrap](https://getbootstrap.com/docs/3.3/) Css

> [vue-router](https://router.vuejs.org/en/) Ruteador

> [vee-validate](http://vee-validate.logaretm.com/) Para validaciones de formularios

# Estructura de la carpeta src
- assets (Css, js(de ser requerido), images, fuentes)
- common_class (Clases de uso comun)
- layouts (Vista base para el admin y login)
  - includes (Vista para el header y sidebar)
- router (Incluye archivo con defininiion de rutas)
- components (Incluye vista que seran utilzadas ej: index para empleado, crear empleado)
  - por cada entidad se debe de crear una carpeta
- controllers (Incluye los archivos que se encargaran de la logica) 



# Rutas Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| nombre | Ruta |
| ------ | ------ |
| login | [localhost:8081/login](localhost:8081/login) |
| Usuarios | [localhost:8081/admin/users](localhost:8081/admin/users) |

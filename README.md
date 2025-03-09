# Proyecto de Pokémon API

Este proyecto permite consultar la API de Pokémon, almacenar en caché las respuestas . El proyecto está construido con **NestJS**.

## Requisitos previos
- **Visual Studio code 
- **Node.js** --> versión 20.x o superior) 
- **npm**

- **Docker** -> para la ejecucion con  un contenedor

## Ejecucion  sin Docker

### 1. **Clonar el repositorio:**
```bash
git clone https://github.com/stevencol/poke-api-back
```
### 3. **Dirrecionar al  proyecto**
``` bash
cd poke-api-back
```
### 3. **Instalar dependencias:**
npm install

### 4,  **Crea un archivo .env **
en la raíz del proyecto y agrega las siguientes variables de entorno :
- POKE_API_URL=https://pokeapi.co/api/v2/pokemon


### 5,  **Ejecutar el proyecto: **
Para ejecutar el proyecto en modo de desarrollo, usa el siguiente comando::
- npm run start:dev


### 6,  **Acceder a la aplicación **
Una vez que el proyecto esté en ejecución, puedes acceder a la aplicación en:
- http://localhost:3000/pokemon/:id -> dodne id puede ser el nombre del pokemon o el numero de la pokedesk



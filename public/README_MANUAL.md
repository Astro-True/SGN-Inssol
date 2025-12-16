# Manual de Usuario - SGN-Inssol

## Resumen
Esta aplicación es un backend en Node.js/Express con una interfaz estática en la carpeta `public`. El servidor sirve estáticos y expone varias rutas REST para gestionar usuarios, roles, datos personales y académicos, y autenticación.

## Ruta principal
- Ruta raíz (saludo): `GET /` → responde "Hello World!".
- Interfaz web principal (archivos estáticos): `http://localhost:3000/` (sirve los archivos en la carpeta `public`). Ejemplo: `http://localhost:3000/AreaAdmin.html`.

## Endpoints API principales
Las rutas están montadas en `index.js` con los prefijos siguientes:

- `/Usuario`
  - `GET /Usuario/lista` (restringido): lista usuarios — requiere sesión/autenticación
  - `GET /Usuario/detalle/:id` (restringido): detalle de usuario
  - `POST /Usuario/crear` (restringido): crear usuario
  - `PUT /Usuario/actualizar/:id` (restringido): actualizar usuario
  - `DELETE /Usuario/eliminar/:id` (restringido): eliminar usuario

- `/Roles`
  - `GET /Roles/lista` (restringido): obtener lista de roles
  - `POST /Roles/actualizar` (restringido): actualizar roles

- `/Historialcontraseniarutas`
  - `GET /Historialcontraseniarutas/` : listar historial de contraseñas
  - `POST /Historialcontraseniarutas/` : crear entrada de historial

- `/Datospersonales`
  - `GET /Datospersonales/` : listar datos personales
  - `POST /Datospersonales/` : crear datos personales

- `/DatosAcademicos`
  - `GET /DatosAcademicos/` : listar datos académicos
  - `POST /DatosAcademicos/` : crear datos académicos

- `/Autenticacion`
  - `POST /Autenticacion/login` : iniciar sesión (devuelve token o establece sesión según implementación)
  - `GET /Autenticacion/datos` (restringido): obtener datos del usuario autenticado

Nota: Las rutas que requieren autenticación usan `authMiddleware` (ver `common/middleware.js`).

## Requisitos
- Node.js (recomendado >= 14)
- npm
- PostgreSQL (la aplicación usa `pg` y `sequelize`).

## Configuración
- Configurar la conexión a la base de datos editando `modelos/conexion.js`. Por defecto contiene una URL de ejemplo:

  `postgres://postgres:12345@localhost:5432/ejemplo`

  Ajusta usuario, contraseña, host y nombre de BD según tu entorno. Si necesitas SSL para un servicio gestionado, descomenta y adapta la sección correspondiente en `modelos/conexion.js`.

## Instalación y ejecución
1. Instalar dependencias:

```
npm install
```

2. Iniciar el servidor:

```
node index.js
```

3. Acceder a la aplicación:

 - API: `http://localhost:3000/` + rutas descritas arriba (puedes usar Postman o curl).
 - Interfaz estática: por ejemplo `http://localhost:3000/AreaAdmin.html`.

Si deseas que el servidor se reinicie automáticamente durante desarrollo, instala `nodemon` globalmente (`npm i -g nodemon`) y ejecuta `nodemon index.js`.

## Autenticación y sesiones
- El proyecto usa `express-session` (configurada en `index.js`) y un middleware `authMiddleware` en `common/middleware.js`. Las rutas que incluyen `authMiddleware` requieren que el usuario esté autenticado (por sesión o token según implementación).

## Estructura de archivos relevante
- `index.js` — entrada principal del servidor, monta rutas y sirve `public`.
- `public/` — archivos estáticos (vistas front-end).
- `rutas/` — definición de rutas Express agrupadas por funcionalidad.
- `controladores/` — lógica que maneja las peticiones.
- `modelos/` — definición de modelos Sequelize y configuración de la base de datos.

## Pruebas rápidas (curl)
- Login (ejemplo, ajusta body):

```
curl -X POST http://localhost:3000/Autenticacion/login -H "Content-Type: application/json" -d '{"usuario":"admin","contrasenia":"1234"}'
```

- Obtener lista de usuarios (requiere autenticación; si usa sesión, primero haz login en el mismo cliente):

```
curl http://localhost:3000/Usuario/lista
```

## Problemas comunes
- Si la conexión a la BD falla, revisa la URL en `modelos/conexion.js` y que PostgreSQL esté corriendo.
- Si ves respuestas 401/403, verifica el middleware de autenticación y que el login devuelva correctamente la sesión o token.

## Siguientes pasos sugeridos
- Añadir script `start` en `package.json`:

```
"scripts": {
  "start": "node index.js"
}
```
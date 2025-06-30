# Proyecto UTN - App CRUD con Búsqueda por Nombre

## Descripción

Este proyecto es una aplicación CRUD de productos que permite gestionar productos con categorías y usuarios autenticados.  
Se agregó una funcionalidad complementaria que permite buscar productos por nombre de forma parcial e insensible a mayúsculas/minúsculas, tanto desde el frontend como desde el backend.

---

## Tecnologías utilizadas

- **Backend:** Node.js, Express, TypeScript, Mongoose, JWT, Zod (validaciones), dotenv  
- **Frontend:** React, React Router, Context API, Vite, JavaScript  
- **Base de datos:** MongoDB  
- **Otras:** Fetch API, CSS personalizado

---

## Funcionalidad nueva: búsqueda por nombre

- En el frontend hay un input de búsqueda en la pantalla principal (`Home`) que permite buscar productos por nombre.  
- La búsqueda es dinámica y realiza llamadas al backend en tiempo real conforme se escribe.  
- El backend recibe la consulta y utiliza expresiones regulares para buscar productos cuyo nombre contenga el texto ingresado, sin importar mayúsculas/minúsculas.  
- Los resultados se muestran inmediatamente en la lista de productos.

---

## Variables de entorno necesarias

### Backend (.env)

```env
PORT=1234
URI_DB=mongodb://localhost:27017/app-utn-final
JWT_SECRET=megustaelarroz


Instrucciones para ejecutar el proyecto
Backend
Asegurarse de tener MongoDB corriendo localmente o configurar URI_DB para la base remota.
Instalar dependencias con npm install o yarn.
Crear el archivo .env con las variables mencionadas arriba.
Ejecutar el servidor con npm run dev o el script que tengas configurado.

El backend quedará escuchando en el puerto configurado (por defecto 1234).

Frontend
Instalar dependencias con npm install o yarn.
Crear archivo .env en la raíz con la variable VITE_BACKEND_URL apuntando a la URL del backend (ejemplo: http://localhost:1234).
Ejecutar el frontend con npm run dev (Vite).
Acceder a http://localhost:5173 (o el puerto que Vite asigne).

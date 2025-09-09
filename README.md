# Formulario UGC - Versión Simple

Esta es una versión simplificada del formulario de inscripción UGC usando HTML, CSS y JavaScript vanilla. Es mucho más fácil de deployar que la versión React.

## 🚀 Características

- **Diseño idéntico** al componente React original
- **Sin dependencias** de frameworks (solo HTML, CSS, JS)
- **Fácil deploy** en cualquier servidor web
- **Misma funcionalidad** completa del formulario
- **Conectado a la misma base de datos** Supabase

## 📁 Archivos incluidos

- `index.html` - Estructura del formulario
- `styles.css` - Estilos que replican exactamente el diseño original
- `script.js` - Lógica del formulario y conexión a Supabase
- `config.js` - Configuración de credenciales
- `README.md` - Este archivo

## ⚙️ Configuración

### 1. Configurar credenciales de Supabase

Edita el archivo `config.js` y reemplaza las credenciales:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://tu-proyecto.supabase.co',
    anonKey: 'tu-clave-anonima-aqui'
};
```

**Para usar las mismas credenciales del proyecto principal:**
1. Abre el archivo `.env` del proyecto React
2. Copia el valor de `VITE_SUPABASE_URL`
3. Copia el valor de `VITE_SUPABASE_ANON_KEY`
4. Pégalos en `config.js`

### 2. Actualizar script.js

Edita `script.js` y reemplaza las líneas 2-3:

```javascript
const SUPABASE_URL = 'TU_SUPABASE_URL_AQUI';
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY_AQUI';
```

Con tus credenciales reales:

```javascript
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY = 'tu-clave-anonima-aqui';
```

## 🌐 Deploy

### Opción 1: Servidor web simple

1. Sube todos los archivos a tu servidor web
2. Asegúrate de que `index.html` sea el archivo principal
3. ¡Listo!

### Opción 2: Netlify (Recomendado)

1. Arrastra la carpeta `ugc-simple` a [netlify.com](https://netlify.com)
2. Tu sitio estará disponible inmediatamente
3. Netlify te dará una URL como `https://amazing-name-123456.netlify.app`

### Opción 3: Vercel

1. Instala Vercel CLI: `npm i -g vercel`
2. En la carpeta `ugc-simple`, ejecuta: `vercel`
3. Sigue las instrucciones

### Opción 4: GitHub Pages

1. Sube los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama y carpeta
4. Tu sitio estará en `https://tu-usuario.github.io/tu-repo`

## 🔧 Funcionalidades

### ✅ Incluidas
- Validación completa de formularios
- Subida de archivos de video a Supabase Storage
- Guardado de datos en la base de datos
- Pantalla de éxito
- Manejo de errores
- Diseño responsive
- Drag & drop para archivos

### 📋 Campos del formulario
- Nombre completo *
- Correo electrónico *
- Número de teléfono *
- Experiencia UGC *
- Enlace a portafolio (opcional)
- Equipos de grabación (opcional)
- Video demo * (máx. 100MB)
- Aplicaciones de edición *
- Compromiso de disponibilidad *
- Cómo se enteró *

## 🛠️ Personalización

### Cambiar colores
Edita `styles.css` y busca los colores que quieras cambiar:
- Rosa: `#f472b6`
- Azul: `#3b82f6`
- Verde: `#10b981`
- Morado: `#8b5cf6`
- Naranja: `#f97316`

### Modificar campos
Para agregar o quitar campos:
1. Edita la estructura HTML en `index.html`
2. Agrega los estilos correspondientes en `styles.css`
3. Actualiza la validación en `script.js`

## 🐛 Solución de problemas

### Error: "Supabase no está configurado"
- Verifica que las credenciales en `script.js` sean correctas
- Asegúrate de que la URL termine en `.supabase.co`
- Verifica que la clave anónima sea la correcta

### Error al subir archivos
- Verifica que el bucket `video-demos` exista en Supabase Storage
- Asegúrate de que las políticas de Storage permitan uploads públicos

### Error al guardar datos
- Verifica que la tabla `ugc_applications` exista
- Asegúrate de que las políticas de la tabla permitan inserts

## 📊 Base de datos

La aplicación usa la misma estructura de base de datos que el proyecto React:

**Tabla: `ugc_applications`**
- `id` (int, primary key, auto-increment)
- `created_at` (timestamp, default now())
- `nombre_completo` (text)
- `correo_electronico` (text)
- `numero_telefono` (text)
- `experiencia_ugc` (text)
- `enlace_portafolio` (text, nullable)
- `equipos_grabacion` (text, nullable)
- `video_demo_url` (text, nullable)
- `aplicaciones_edicion` (text)
- `disponibilidad_3_dias` (boolean)
- `como_se_entero` (text)

**Storage Bucket: `video-demos`**
- Configurado para archivos públicos
- Políticas que permiten upload y lectura

## 🚀 Ventajas de esta versión

1. **Deploy instantáneo** - No necesita build ni dependencias
2. **Menor tamaño** - Solo archivos estáticos
3. **Mayor compatibilidad** - Funciona en cualquier servidor
4. **Más rápido** - Carga instantánea
5. **Fácil mantenimiento** - Código simple y directo
6. **Mismo diseño** - Idéntico al original
7. **Misma funcionalidad** - Todas las características

## 📞 Soporte

Si tienes problemas:
1. Verifica que las credenciales de Supabase sean correctas
2. Asegúrate de que la base de datos y storage estén configurados
3. Revisa la consola del navegador para errores
4. Verifica que todos los archivos estén en el servidor

¡Listo para usar! 🎉
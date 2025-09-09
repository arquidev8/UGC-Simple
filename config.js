// Configuración de Supabase
// IMPORTANTE: Reemplaza estos valores con tus credenciales reales de Supabase

const SUPABASE_CONFIG = {
    url: 'https://wlvzosslmveemcququnm.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsdnpvc3NsbXZlZW1jcXVxdW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDIzMDAsImV4cCI6MjA3MjkxODMwMH0.G_dtahFC36dH5Ghn0YSTLwOFscoMgxm6RH3Mv4LNd68'
};

// Para usar las mismas credenciales del proyecto principal:
// 1. Copia el valor de VITE_SUPABASE_URL del archivo .env
// 2. Copia el valor de VITE_SUPABASE_ANON_KEY del archivo .env
// 3. Reemplaza los valores arriba

// Ejemplo de cómo debería verse:
// const SUPABASE_CONFIG = {
//     url: 'https://abcdefghijklmnop.supabase.co',
//     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
// };

// Exportar configuración
if (typeof window !== 'undefined') {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}
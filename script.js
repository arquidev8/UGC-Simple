// Configuración de Supabase - REEMPLAZA CON TUS CREDENCIALES REALES
// Copia estos valores del archivo .env del proyecto principal:
// VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
const SUPABASE_URL = 'https://wlvzosslmveemcququnm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsdnpvc3NsbXZlZW1jcXVxdW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDIzMDAsImV4cCI6MjA3MjkxODMwMH0.G_dtahFC36dH5Ghn0YSTLwOFscoMgxm6RH3Mv4LNd68';

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('Supabase client initialized:', supabase);
console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Key (first 20 chars):', SUPABASE_ANON_KEY.substring(0, 20) + '...');

// Estado del formulario
let isSubmitting = false;

// Variables para elementos del DOM (se inicializarán cuando el DOM esté listo)
let form, submitBtn, successMessage, formContainer;
let videoInput, nameInput, emailInput, phoneInput;
let portfolioInput, enlaceSecundarioInput, enlacePortafolioWebInput, equipmentInput, availabilityInput, referralInput;
let progressContainer, progressFill, progressPercentage, progressStatus;

// Funciones de utilidad
function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Funciones de barra de progreso
function showProgress() {
    if (progressContainer) {
        progressContainer.style.display = 'block';
        updateProgress(0, 'Preparando...');
    }
}

function hideProgress() {
    if (progressContainer) {
        progressContainer.style.display = 'none';
    }
}

function updateProgress(percentage, status) {
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    if (progressPercentage) {
        progressPercentage.textContent = Math.round(percentage) + '%';
    }
    if (progressStatus) {
        progressStatus.textContent = status;
    }
}

function hideError(errorElement) {
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function hideAllErrors() {
    const errorElements = [
    document.getElementById('error-video_demo'),
    document.getElementById('error-nombre_completo'),
    document.getElementById('error-correo_electronico'),
    document.getElementById('error-numero_telefono'),
    document.getElementById('error-experiencia_ugc'),
    document.getElementById('error-enlace_portafolio'),
    document.getElementById('error-equipos_grabacion'),
    document.getElementById('error-aplicaciones_edicion'),
    document.getElementById('error-disponibilidad_3_dias'),
    document.getElementById('error-como_se_entero')
];
    errorElements.forEach(hideError);
}

// Validaciones
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateUrl(url) {
    if (!url) return true; // Campo opcional
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function validateForm() {
    console.log('Starting form validation...');
    let isValid = true;
    hideAllErrors();

    // Validar video
    console.log('Validating video input:', videoInput.files);
    if (!videoInput.files || videoInput.files.length === 0) {
        console.log('Video validation failed - no file selected');
        showError(document.getElementById('error-video_demo'), 'Por favor selecciona un video');
        isValid = false;
    } else {
        console.log('Video validation passed');
        const file = videoInput.files[0];
        const maxSize = 100 * 1024 * 1024; // 100MB
        const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
        
        if (file.size > maxSize) {
            showError(document.getElementById('error-video_demo'), 'El video no puede superar los 100MB');
            isValid = false;
        } else if (!allowedTypes.includes(file.type)) {
            showError(document.getElementById('error-video_demo'), 'Formato de video no válido. Usa MP4, MOV, AVI o WebM');
            isValid = false;
        }
    }

    // Validar nombre
    console.log('Validating name:', nameInput.value);
    if (!nameInput.value.trim()) {
        console.log('Name validation failed - empty');
        showError(document.getElementById('error-nombre_completo'), 'El nombre es requerido');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        console.log('Name validation failed - too short');
        showError(document.getElementById('error-nombre_completo'), 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    } else {
        console.log('Name validation passed');
    }

    // Validar email
    console.log('Validating email:', emailInput.value);
    if (!emailInput.value.trim()) {
        console.log('Email validation failed - empty');
        showError(document.getElementById('error-correo_electronico'), 'El email es requerido');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        console.log('Email validation failed - invalid format');
        showError(document.getElementById('error-correo_electronico'), 'Por favor ingresa un email válido');
        isValid = false;
    } else {
        console.log('Email validation passed');
    }

    // Validar teléfono
    console.log('Validating phone:', phoneInput.value);
    if (!phoneInput.value.trim()) {
        console.log('Phone validation failed - empty');
        showError(document.getElementById('error-numero_telefono'), 'El teléfono es requerido');
        isValid = false;
    } else if (!validatePhone(phoneInput.value.trim())) {
        console.log('Phone validation failed - invalid format');
        showError(document.getElementById('error-numero_telefono'), 'Por favor ingresa un teléfono válido');
        isValid = false;
    } else {
        console.log('Phone validation passed');
    }

    // Validar portafolio (opcional)
    console.log('Validating portfolio:', portfolioInput.value);
    if (portfolioInput.value.trim() && !validateUrl(portfolioInput.value.trim())) {
        console.log('Portfolio validation failed - invalid URL');
        showError(document.getElementById('error-enlace_portafolio'), 'Por favor ingresa una URL válida');
        isValid = false;
    } else {
        console.log('Portfolio validation passed');
    }

    // Validar enlace secundario (opcional)
    if (enlaceSecundarioInput) {
        console.log('Validating secondary link:', enlaceSecundarioInput.value);
        if (enlaceSecundarioInput.value.trim() && !validateUrl(enlaceSecundarioInput.value.trim())) {
            console.log('Secondary link validation failed - invalid URL');
            showError(document.getElementById('error-enlace_secundario'), 'Por favor ingresa una URL válida');
            isValid = false;
        } else {
            console.log('Secondary link validation passed');
        }
    }

    // Validar portafolio web (opcional)
    if (enlacePortafolioWebInput) {
        console.log('Validating web portfolio:', enlacePortafolioWebInput.value);
        if (enlacePortafolioWebInput.value.trim() && !validateUrl(enlacePortafolioWebInput.value.trim())) {
            console.log('Web portfolio validation failed - invalid URL');
            showError(document.getElementById('error-enlace_portafolio_web'), 'Por favor ingresa una URL válida');
            isValid = false;
        } else {
            console.log('Web portfolio validation passed');
        }
    }

    // Validar equipos de grabación (opcional)
    console.log('Validating equipment:', equipmentInput.value);
    if (equipmentInput.value.trim() && equipmentInput.value.trim().length < 10) {
        console.log('Equipment validation failed - too short');
        showError(document.getElementById('error-equipos_grabacion'), 'Por favor describe tus equipos con más detalle (mínimo 10 caracteres)');
        isValid = false;
    } else {
        console.log('Equipment validation passed');
    }

    // Validar disponibilidad
    console.log('Validating availability:', availabilityInput.checked);
    if (!availabilityInput.checked) {
        console.log('Availability validation failed - not checked');
        showError(document.getElementById('error-disponibilidad_3_dias'), 'Debes confirmar tu disponibilidad');
        isValid = false;
    } else {
        console.log('Availability validation passed');
    }

    // Validar cómo se enteró
    console.log('Validating referral:', referralInput.value);
    if (!referralInput.value.trim()) {
        console.log('Referral validation failed - empty');
        showError(document.getElementById('error-como_se_entero'), 'Por favor indica cómo te enteraste');
        isValid = false;
    } else {
        console.log('Referral validation passed');
    }

    // Validar experiencia UGC
    const experienceRadio = document.querySelector('input[name="experiencia_ugc"]:checked');
    console.log('Validating experience UGC:', experienceRadio);
    if (!experienceRadio) {
        console.log('Experience UGC validation failed - no selection');
        showError(document.getElementById('error-experiencia_ugc'), 'Por favor selecciona tu nivel de experiencia');
        isValid = false;
    } else {
        console.log('Experience UGC validation passed');
    }

    console.log('Form validation result:', isValid);
    return isValid;
}

// Función para subir video a Supabase Storage
async function uploadVideo(file) {
    console.log('Starting video upload...', file);
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `videos/${fileName}`;

        console.log('Uploading to path:', filePath);
        console.log('Supabase storage client:', supabase.storage);
        
        // Simular progreso de subida
        updateProgress(10, 'Iniciando subida...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        updateProgress(30, 'Subiendo video...');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        updateProgress(60, 'Procesando archivo...');
        
        const { data, error } = await supabase.storage
            .from('video-demos')
            .upload(filePath, file);

        console.log('Upload response - data:', data, 'error:', error);
        
        if (error) {
            console.error('Error uploading video:', error);
            throw error;
        }
        
        updateProgress(85, 'Generando URL...');
        await new Promise(resolve => setTimeout(resolve, 200));
        
        console.log('Video upload successful:', data);

        // Obtener URL pública del video
        const { data: urlData } = supabase.storage
            .from('video-demos')
            .getPublicUrl(filePath);

        updateProgress(100, 'Video subido exitosamente!');
        await new Promise(resolve => setTimeout(resolve, 300));

        console.log('Video upload completed, returning data:', { path: filePath, url: urlData.publicUrl });
        return {
            path: filePath,
            url: urlData.publicUrl
        };
    } catch (error) {
        console.error('Error in uploadVideo:', error);
        throw error;
    }
}

// Función para guardar datos en la base de datos
async function saveToDatabase(videoData) {
    console.log('Starting database save...', { videoData });
    try {
        const experienceValue = document.querySelector('input[name="experiencia_ugc"]:checked')?.value || null;
         const selectedApps = Array.from(document.querySelectorAll('input[name="aplicaciones_edicion"]:checked'))
             .map(checkbox => checkbox.value);
         
         const applicationData = {
             nombre_completo: nameInput.value.trim(),
             correo_electronico: emailInput.value.trim(),
             numero_telefono: phoneInput.value.trim(),
             experiencia_ugc: experienceValue,
             enlace_portafolio: portfolioInput.value?.trim() || null,
             enlace_secundario: enlaceSecundarioInput.value?.trim() || null,
             enlace_portafolio_web: enlacePortafolioWebInput.value?.trim() || null,
             equipos_grabacion: equipmentInput.value?.trim() || null,
             aplicaciones_edicion: selectedApps.length > 0 ? selectedApps.join(', ') : null,
             disponibilidad_3_dias: availabilityInput.checked,
             como_se_entero: referralInput.value.trim(),
             video_demo_url: videoData.url
         };
         console.log('Application data prepared:', applicationData);

        console.log('Inserting data into database...');
        const { data, error } = await supabase
            .from('ugc_applications')
            .insert([applicationData])
            .select();

        if (error) {
            console.error('Error saving to database:', error);
            throw error;
        }
        console.log('Database insert successful:', data);

        return data[0];
    } catch (error) {
        console.error('Error in saveToDatabase:', error);
        throw error;
    }
}

// Manejador de envío del formulario
async function handleSubmit(event) {
    console.log('handleSubmit called!', event);
    event.preventDefault();
    
    if (isSubmitting) {
        console.log('Already submitting, returning...');
        return;
    }
    
    // Validar formulario
    console.log('Validating form...');
    if (!validateForm()) {
        console.log('Form validation failed');
        return;
    }
    console.log('Form validation passed');
    
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
    
    // Mostrar barra de progreso
    showProgress();
    
    try {
        console.log('Starting form submission process...');
        const formData = new FormData(form);
        const videoFile = videoInput.files[0];
        console.log('Form data created:', formData);
        console.log('Video file:', videoFile);
        
        // Subir video
        console.log('Subiendo video...');
        const videoData = await uploadVideo(videoFile);
        console.log('Video subido:', videoData);
        
        // Actualizar progreso para guardado en base de datos
        updateProgress(100, 'Guardando datos...');
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Guardar en base de datos
        console.log('Guardando en base de datos...');
        const savedData = await saveToDatabase(videoData);
        console.log('Datos guardados:', savedData);
        
        // Ocultar barra de progreso
        hideProgress();
        
        // Mostrar mensaje de éxito
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll al mensaje de éxito
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        
        // Mostrar error específico
        let errorMessage = 'Hubo un error al enviar tu aplicación. ';
        
        if (error.message?.includes('storage')) {
            errorMessage += 'Error al subir el video. Verifica que el archivo sea válido.';
        } else if (error.message?.includes('database') || error.message?.includes('insert')) {
            errorMessage += 'Error al guardar los datos. Inténtalo nuevamente.';
        } else {
            errorMessage += 'Por favor, inténtalo nuevamente.';
        }
        
        alert(errorMessage);
        
        // Ocultar barra de progreso en caso de error
        hideProgress();
        
    } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar Aplicación';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing form...');
    
    // Inicializar elementos del DOM
    form = document.getElementById('ugc-form');
    submitBtn = document.getElementById('submit-btn');
    successMessage = document.getElementById('success-screen');
    formContainer = document.getElementById('form-container');
    videoInput = document.getElementById('video_demo');
    nameInput = document.getElementById('nombre_completo');
    emailInput = document.getElementById('correo_electronico');
    phoneInput = document.getElementById('numero_telefono');
    portfolioInput = document.getElementById('enlace_portafolio');
    enlaceSecundarioInput = document.getElementById('enlace_secundario');
    enlacePortafolioWebInput = document.getElementById('enlace_portafolio_web');
    equipmentInput = document.getElementById('equipos_grabacion');
    availabilityInput = document.getElementById('disponibilidad_3_dias');
    referralInput = document.getElementById('como_se_entero');
    
    // Inicializar elementos de la barra de progreso
    progressContainer = document.getElementById('progress-container');
    progressFill = document.getElementById('progress-fill');
    progressPercentage = document.getElementById('progress-percentage');
    progressStatus = document.getElementById('progress-status');
    
    console.log('Form element:', form);
    console.log('Submit button:', submitBtn);
    console.log('Progress elements:', { progressContainer, progressFill, progressPercentage, progressStatus });
    
    // Agregar event listener al formulario
    if (form) {
        console.log('Adding submit event listener to form');
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('Form element not found!');
    }
    
    // También agregar listener directo al botón por si acaso
    if (submitBtn) {
        console.log('Adding click event listener to submit button');
        submitBtn.addEventListener('click', function(e) {
            console.log('Submit button clicked!');
            if (form) {
                e.preventDefault();
                handleSubmit(e);
            }
        });
    }
    
    // Validación en tiempo real para campos individuales
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim() && this.value.trim().length < 2) {
                showError(document.getElementById('error-nombre_completo'), 'El nombre debe tener al menos 2 caracteres');
            } else {
                hideError(document.getElementById('error-nombre_completo'));
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.trim() && !validateEmail(this.value.trim())) {
                showError(document.getElementById('error-correo_electronico'), 'Por favor ingresa un email válido');
            } else {
                hideError(document.getElementById('error-correo_electronico'));
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value.trim() && !validatePhone(this.value.trim())) {
                showError(document.getElementById('error-numero_telefono'), 'Por favor ingresa un teléfono válido');
            } else {
                hideError(document.getElementById('error-numero_telefono'));
            }
        });
    }
    
    if (portfolioInput) {
        portfolioInput.addEventListener('blur', function() {
            if (this.value.trim() && !validateUrl(this.value.trim())) {
                showError(document.getElementById('error-enlace_portafolio'), 'Por favor ingresa una URL válida');
            } else {
                hideError(document.getElementById('error-enlace_portafolio'));
            }
        });
    }
    
    if (enlaceSecundarioInput) {
        enlaceSecundarioInput.addEventListener('blur', function() {
            if (this.value.trim() && !validateUrl(this.value.trim())) {
                showError(document.getElementById('error-enlace_secundario'), 'Por favor ingresa una URL válida');
            } else {
                hideError(document.getElementById('error-enlace_secundario'));
            }
        });
    }
    
    if (enlacePortafolioWebInput) {
        enlacePortafolioWebInput.addEventListener('blur', function() {
            if (this.value.trim() && !validateUrl(this.value.trim())) {
                showError(document.getElementById('error-enlace_portafolio_web'), 'Por favor ingresa una URL válida');
            } else {
                hideError(document.getElementById('error-enlace_portafolio_web'));
            }
        });
    }
    
    // Limpiar errores cuando el usuario empiece a escribir
    const inputs = [nameInput, emailInput, phoneInput, portfolioInput, enlaceSecundarioInput, enlacePortafolioWebInput, equipmentInput, referralInput];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                const errorElement = document.getElementById(this.id + '-error');
                if (errorElement && errorElement.style.display === 'block') {
                    hideError(errorElement);
                }
            });
        }
    });
    
    // Limpiar error de video cuando se seleccione un archivo
    if (videoInput) {
        videoInput.addEventListener('change', function() {
            hideError(document.getElementById('error-video_demo'));
        });
    }
    
    // Limpiar error de experiencia cuando se seleccione
    const experienceRadios = document.querySelectorAll('input[name="experiencia_ugc"]');
    experienceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            hideError(document.getElementById('error-experiencia_ugc'));
        });
    });
    
    // Limpiar error de disponibilidad cuando se marque
    if (availabilityInput) {
        availabilityInput.addEventListener('change', function() {
            if (this.checked) {
                hideError(document.getElementById('error-disponibilidad_3_dias'));
            }
        });
    }
    
    // Botón "Enviar otra aplicación" en la vista de éxito
    const newApplicationBtn = document.getElementById('new-application-btn');
    if (newApplicationBtn) {
        newApplicationBtn.addEventListener('click', function() {
            console.log('New application button clicked');
            // Ocultar vista de éxito y mostrar formulario
            successMessage.style.display = 'none';
            formContainer.style.display = 'block';
            
            // Limpiar el formulario
            if (form) {
                form.reset();
            }
            
            // Limpiar todos los errores
            hideAllErrors();
            
            // Scroll al formulario
            formContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

console.log('Script de formulario UGC cargado correctamente');
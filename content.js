// Función para buscar el nombre del proyecto en la interfaz de Google
function detectarProyecto() {
    const nombre = document.title; // GAS suele poner el nombre del proyecto en el título de la pestaña
    console.log("WakaTime detectó el proyecto: " + nombre);
}

// Ejecutar la detección cada 5 segundos
setInterval(detectarProyecto, 5000);
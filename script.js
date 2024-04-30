const restultPin = document.getElementById('pin');
let recognition; // Definir el objeto recognition fuera del alcance del evento
let isListening = false; // Bandera para controlar si el reconocimiento está activo
const user = "administrador 1234";

document.addEventListener('DOMContentLoaded', function () {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false; // Desactivar resultados intermedios para evitar errores 'no-speech'

    recognition.onstart = function () {
        console.log("Reconocimiento de voz iniciado");
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.trim();

        if (transcript.toLowerCase().includes("yaquis")) {
            console.log("Palabra clave 'Yaquis' detectada. Ejecutando acciones...");
            const textAfter = transcript.toLowerCase().split("yaquis")[1].trim();
            document.getElementById('pin').value = transcript; //Mostrar el contenido en el elemento con id "pin"
            if (textAfter === user) {
                console.log("PIN correcto. Redirigiendo a aplicación de detección de voz.");
                window.location.href = "app-execute/index.html";
            } else {
                console.log("PIN incorrecto.");
                alert("PIN incorrecto. Por favor, intentálo de nuevo.");
            }
        }
    };

    recognition.onend = function () {
        console.log("Reconocimiento de voz detenido");
        if (isListening) {
            console.log("Reiniciando reconocimiento de voz...");
            recognition.start();
        }
    };

    recognition.onerror = function (event) {
        console.error("Error en el reconocimiento de voz:", event.error);
        if (event.error === 'no-speech') {
            if (!isListening) {
                console.log("Iniciando reconocimiento de voz debido a 'no-speech'...");
                recognition.start();
            }
        }
    };

    // Iniciar reconocimiento al cargar la página
    recognition.start();
    isListening = true;
});

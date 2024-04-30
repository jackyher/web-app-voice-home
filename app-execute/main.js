const resultDiv = document.getElementById('result');
let recognition; // Definir el objeto recognition fuera del alcance del evento
let isListening = false; // Bandera para controlar si el reconocimiento está activo

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
            if (textAfter) {
                resultDiv.innerHTML = `<p class="text-center underline">${transcript}</p>`;
                executeActions(textAfter);
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

function executeActions(transcript) {
    const enciendeRecam = 'enciende la luz de la recámara';
    const apagaRecam = 'apaga la luz de la recámara';
    const enciendeSala = 'enciende la luz de la sala';
    const apagaSala = 'apaga la luz de la sala';
    const enciendeJardin = 'enciende las luces del jardín';
    const apagaJardin = 'apaga las luces del jardín';
    const enciendeVenti = 'enciende el ventilador';
    const apagaVenti = 'apaga el ventilador';
    const abreCortinas = 'abre las cortinas';
    const cierraCortinas = 'cierra las cortinas';
    const activaAlarm = 'activa la alarma de la casa';
    const desacAlarm = 'desactiva la alarma de la casa';
    const enciendeCam = 'enciende las cámaras de seguridad';
    const apagaCam = 'apaga las cámaras de seguridad';

    let enviarMockapi = false;
    const fecha = new Date();
    const formatFecha = fecha.toLocaleString(); //Para convertir la fecha a la zona horaria del usuario

    //Para encender luz de la recámara
    if(transcript.includes(enciendeRecam)) { //Para encontrar palabra en específico
        console.log("Luz de la recámara endendida");
        enviarMockapi = true;
    }

    //Para apagar la luz de la recámara
    if(transcript.includes(apagaRecam)) {
        console.log("Luz de la recámara apagada");
        enviarMockapi = true;
    }

    //Para encender la luz de la sala
    if(transcript.includes(enciendeSala)) {
        console.log("Luz de la sala encendida");
        enviarMockapi = true;
    }

    //Para apagar la luz de la sala
    if(transcript.includes(apagaSala)) {
        console.log("Luz de la sala apagada");
        enviarMockapi = true;
    }

    //Para enceder las luces del jardín
    if(transcript.includes(enciendeJardin)) {
        console.log("Luces del jardín encendidas");
        enviarMockapi = true;
    }

    //Para apagar las luces del jardín
    if(transcript.includes(apagaJardin)) {
        console.log("Luces del jardín apagadas");
        enviarMockapi = true;
    }

    //Para encender el ventilador
    if(transcript.includes(enciendeVenti)) {
        console.log("Ventilador encendido");
        enviarMockapi = true;
    }

    //Para apagar el ventilador
    if(transcript.includes(apagaVenti)) {
        console.log("Ventilador apagado");
        enviarMockapi = true;
    }

    //Para abrir cortinas
    if(transcript.includes(abreCortinas)) {
        console.log("Cortinas abiertas");
        enviarMockapi = true;
    }

    //Para cerrar cortinas
    if(transcript.includes(cierraCortinas)) {
        console.log("Cortinas cerradas");
        enviarMockapi = true;
    }

    //Para activar alarma
    if(transcript.includes(activaAlarm)) {
        console.log("Alarma activada");
        enviarMockapi = true;
    }

    //Para desactivar alarma
    if(transcript.includes(desacAlarm)) {
        console.log("Alarma desactivada");
        enviarMockapi = true;
    }

    //Para encender cámaras
    if(transcript.includes(enciendeCam)) {
        console.log("Cámaras encendidas");
        enviarMockapi = true;
    }

    //Para apagar cámaras
    if(transcript.includes(apagaCam)) {
        console.log("Camaras apagadas");
        enviarMockapi = true;
    }

    //Para enviar a Mockapi
    if(enviarMockapi) {
        const orden = { orden: transcript, usuario: "administrador", fecha: formatFecha }; //Agregamos datos al objeto
        axios.post('https://660f6f5a356b87a55c51616a.mockapi.io/ordenes', orden)
        .then(response => {
            console.log("Orden enviada: ", response.data);
        })
        .catch(error => {
            console.error("Error al enviar la orden: ", error);
        });
    }
    console.log("Ejecutando acciones para:", transcript);
}

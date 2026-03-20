// --- CONFIGURACIÓN DE LA SECUENCIA DE INICIO ---
const messages = [
    "Authenticating ECU Protocol...",
    "Linking Bluetooth OBDII...",
    "Decrypting Vehicle CAN-BUS...",
    "Loading Hyper-Sport Database...",
    "SYSTEM ONLINE"
];

let progress = 0;
let messageIndex = 0;

const progressElement = document.getElementById('progress');
const loadingText = document.getElementById('loading-text');

// Bucle de carga de la barra
const interval = setInterval(() => {
    progress += Math.random() * 12; // Velocidad de carga aleatoria
    if (progress > 100) progress = 100;
    
    progressElement.style.width = `${progress}%`;
    
    // Cambiar el texto de carga según el progreso
    if (progress > (messageIndex + 1) * 20 && messageIndex < messages.length) {
        loadingText.innerText = messages[messageIndex];
        messageIndex++;
    }

    // CUANDO LLEGA AL 100%
    if (progress >= 100) {
        clearInterval(interval);
        
        setTimeout(() => {
            // 1. Desvanecer la pantalla de carga
            const splash = document.getElementById('splash-screen');
            splash.style.opacity = '0';

            // 2. ACTIVAR EL DASHBOARD (Aquí estaba el error)
            const dashboard = document.getElementById('main-dashboard');
            dashboard.style.display = 'flex'; // Cambiamos de 'none' a 'flex'
            
            setTimeout(() => {
                splash.style.display = 'none';
                dashboard.style.opacity = '1';
                document.body.style.overflow = 'auto';
            }, 1000);
        }, 500);
    }
}, 250);

// --- DICCIONARIO DE DIAGNÓSTICO VIP ---
const VIP_DATABASE = {
    "P0300": {
        titulo: "Misfire Detected (Cilindros Múltiples)",
        solucion: "Reemplazar bujías de Iridio y bobinas de encendido.",
        pieza: "Ignition Coil & Spark Plug Set",
        urgencia: "CRITICAL"
    },
    "P0171": {
        titulo: "System Too Lean (Mezcla Pobre)",
        solucion: "Limpiar sensor MAF y revisar fugas de vacío.",
        pieza: "Mass Air Flow Sensor",
        urgencia: "WARNING"
    }
};

// Función para ejecutar el escaneo
function ejecutarEscaneoVIP() {
    const list = document.getElementById('vipErrorList');
    const panel = document.getElementById('masterDiag');
    
    panel.classList.remove('hidden');
    list.innerHTML = `<p class="text-[9px] text-gold tech-font mb-4 tracking-widest">AUDIT RESULTS:</p>`;

    // Simulamos la lectura de códigos
    ["P0300", "P0171"].forEach(code => {
        const data = VIP_DATABASE[code];
        const div = document.createElement('div');
        div.className = "p-4 border border-white/5 bg-navy/20 rounded-xl mb-3";
        div.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-gold font-bold tech-font text-[10px]">${code}</span>
                <span class="text-[7px] ${data.urgencia === 'CRITICAL' ? 'text-red-500' : 'text-yellow-500'} font-bold tracking-tighter">${data.urgencia}</span>
            </div>
            <p class="text-white text-xs font-bold">${data.titulo}</p>
            <p class="text-[9px] opacity-50 mt-2 font-light">REPAIR: ${data.solucion}</p>
        `;
        list.appendChild(div);
    });
    
    alert("System Audit Complete: 2 Critical Issues Identified.");
}

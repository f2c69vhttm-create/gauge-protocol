// --- SECUENCIA DE INICIO (SPLASH SCREEN) ---
const messages = [
    "Authenticating ECU Protocol...",
    "Linking Bluetooth OBDII...",
    "Decrypting Vehicle CAN-BUS...",
    "Loading Hyper-Sport Database...",
    "SYSTEM READY"
];

let progress = 0;
let messageIndex = 0;

const progressElement = document.getElementById('progress');
const loadingText = document.getElementById('loading-text');

const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    progressElement.style.width = `${progress}%`;
    
    // Cambiar texto de carga
    if (progress > (messageIndex + 1) * 20 && messageIndex < messages.length) {
        loadingText.innerText = messages[messageIndex];
        messageIndex++;
    }

    if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
            document.getElementById('splash-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash-screen').style.display = 'none';
                document.getElementById('main-dashboard').style.opacity = '1';
                document.body.style.overflow = 'auto';
            }, 1000);
        }, 500);
    }
}, 300);

// --- LÓGICA DE DIAGNÓSTICO VIP ---
const VIP_DATABASE = {
    "P0300": {
        titulo: "Misfire Detected",
        solucion: "Reemplazar bujías de Iridio y bobinas.",
        pieza: "Ignition Coil Set",
        urgencia: "CRITICAL"
    },
    "P0171": {
        titulo: "System Too Lean",
        solucion: "Limpiar sensor MAF y revisar vacío.",
        pieza: "Air Flow Sensor",
        urgencia: "WARNING"
    }
};

function ejecutarEscaneoVIP() {
    const list = document.getElementById('vipErrorList');
    const panel = document.getElementById('masterDiag');
    
    panel.classList.remove('hidden');
    list.innerHTML = `<p class="text-[9px] text-gold tech-font mb-4 tracking-widest">RESULTADOS DE AUDITORÍA:</p>`;

    // Simulamos detección de fallas
    ["P0300", "P0171"].forEach(code => {
        const data = VIP_DATABASE[code];
        const div = document.createElement('div');
        div.className = "p-4 border border-white/5 bg-navy/20 rounded-lg mb-2";
        div.innerHTML = `
            <div class="flex justify-between">
                <span class="text-gold font-bold tech-font text-xs">${code}</span>
                <span class="text-[7px] text-red-500 font-bold">${data.urgencia}</span>
            </div>
            <p class="text-white text-xs font-bold mt-1">${data.titulo}</p>
            <p class="text-[9px] opacity-60 mt-2 italic">Solución: ${data.solucion}</p>
        `;
        list.appendChild(div);
    });
    
    alert("Escaneo Completo. Se han detectado 2 anomalías en el sistema.");
}

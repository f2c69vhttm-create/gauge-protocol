const messages = ["Authenticating ECU...", "Linking Bluetooth...", "Decrypting CAN-BUS...", "SYSTEM READY"];
let progress = 0;
let msgIdx = 0;

const progBar = document.getElementById('progress');
const loadTxt = document.getElementById('loading-text');
const splash = document.getElementById('splash-screen');

const loadInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    progBar.style.width = `${progress}%`;
    
    if (progress > (msgIdx + 1) * 25 && msgIdx < messages.length) {
        loadTxt.innerText = messages[msgIdx];
        msgIdx++;
    }

    if (progress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
            // EFECTO DE SALIDA: Deslizar hacia arriba y desaparecer
            splash.style.transform = "translateY(-100%)";
            splash.style.opacity = "0";
            document.body.style.overflow = "auto";
            
            // Eliminar del DOM después de la animación para que no estorbe
            setTimeout(() => { splash.remove(); }, 800);
        }, 600);
    }
}, 200);

function ejecutarEscaneoVIP() {
    const list = document.getElementById('vipErrorList');
    const panel = document.getElementById('masterDiag');
    panel.classList.remove('hidden');
    list.innerHTML = `<p class="text-[9px] text-gold tech-font mb-4 tracking-widest uppercase">Audit Results:</p>`;

    const faults = [
        {c: "P0300", t: "Misfire Detected", s: "Replace Ignition Coils", u: "CRITICAL"},
        {c: "P0171", t: "Lean Condition", s: "Clean MAF Sensor", u: "WARNING"}
    ];

    faults.forEach(f => {
        const div = document.createElement('div');
        div.className = "p-4 border border-white/5 bg-navy/20 rounded-xl mb-3";
        div.innerHTML = `
            <div class="flex justify-between text-[10px] font-bold tech-font mb-1">
                <span class="text-gold">${f.c}</span>
                <span class="${f.u === 'CRITICAL' ? 'text-red-500' : 'text-yellow-500'}">${f.u}</span>
            </div>
            <p class="text-white text-xs font-bold">${f.t}</p>
            <p class="text-[9px] opacity-50 mt-1 uppercase tracking-tighter">Fix: ${f.s}</p>
        `;
        list.appendChild(div);
    });
}

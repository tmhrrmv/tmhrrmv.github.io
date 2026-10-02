// ============================================
// TELMAN MAHARRAMOV — WAYNE-TECH OS (BATMAN BEYOND)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ---- Elements ----
    const initialScreen = document.getElementById('initialScreen');
    const bootBtn = document.getElementById('bootSystemBtn');
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingStatusText = document.getElementById('loadingStatusText');
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingSubDetail = document.getElementById('loadingSubDetail');
    const osDesktop = document.getElementById('osDesktop');
    const lockBtn = document.getElementById('lockSystemBtn');
    const osClock = document.getElementById('osLiveClock');

    const folderModal = document.getElementById('folderModalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalHeaderTitle');
    const modalBody = document.getElementById('modalBodyContent');
    const folderItems = document.querySelectorAll('.folder-item');

    // ---- Live Clock ----
    function updateClock() {
        if (!osClock) return;
        const now = new Date();
        osClock.textContent = now.toTimeString().split(' ')[0] + ' UTC';
    }
    setInterval(updateClock, 1000);
    updateClock();

    // ---- Cursor Glow (Disabled per user request) ----
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }

    // ---- Live Crisp Terminal on Initial Screen ----
    const termContainer = document.getElementById('heroTerminalBg');
    if (termContainer) {
        const commands = [
            "root@beyond-hub:~# sudo -u Tm.Bynd --init-net --stealth",
            "[SYS_BOOT] Neo-Gotham SecOps kernel 6.4.0-beyond initialized [OK]",
            "root@beyond-hub:~# ifconfig eth0 10.240.12.88 netmask 255.255.255.0 up",
            "root@beyond-hub:~# ip route add default via 10.240.12.1 dev eth0",
            "[VLAN_SEG] Configuring 802.1Q trunk on port ge-0/0/1... [VLAN 10, 20, 30 TAGGED]",
            "root@beyond-hub:~# ping -c 4 10.254.0.1 (round-trip = 0.32/0.41/0.55 ms)",
            "root@beyond-hub:~# nmap -sS -p 22,80,443,8080 -T4 192.168.100.0/24",
            "[PORT_SCAN] 192.168.100.14: 22/tcp OPEN (OpenSSH), 443/tcp OPEN (HTTPS-TLSv1.3)",
            "root@beyond-hub:~# iptables -A INPUT -i eth0 -p tcp --dport 22 -j ACCEPT",
            "[MWC_ISE_STREAM] Live RF Telemetry: 5GHz/6GHz interference checked. Noise floor -94dBm",
            "root@beyond-hub:~# iperf3 -c 10.240.12.1 -p 5201 -t 10 (Bitrate: 9.42 Gbits/sec)",
            "[SECURITY_AUDIT] L1-L3 diagnostics verified. Rogue AP detection: ZERO threats found.",
            "root@beyond-hub:~# traceroute to wayne-tower.internal (10.0.0.1) -- [REACHED]",
            "[ACCESS LOG] Clearance: GUEST // USER: VISITOR",
            "[TARGET DOSSIER] Subject: Telman Maharramov // ASIR & NET_DEFENSE ACTIVE"
        ];
        let idx = 0;
        function addLine() {
            const div = document.createElement('div');
            div.className = 'cmd-line';
            div.innerHTML = '<span class="cmd-prompt">&gt;</span>' + commands[idx % commands.length];
            termContainer.appendChild(div);
            idx++;
            while (termContainer.children.length > 24) {
                termContainer.removeChild(termContainer.firstChild);
            }
        }
        for (let i = 0; i < 16; i++) addLine();
        setInterval(addLine, 1500);
    }

    // ---- Boot Sequence (On Red Bat Click) ----
    if (bootBtn) {
        bootBtn.addEventListener('click', () => {
            // Hide initial screen
            initialScreen.classList.add('hide-screen');

            // Show Loading Screen
            loadingScreen.classList.add('active');

            let progress = 0;
            const bootStages = [
                { at: 15, msg: 'ESTABLISHING SECURE PROTOCOL...', sub: 'VERIFYING RSA-4096 SIGNATURE' },
                { at: 40, msg: 'LOADING SYSTEM KERNEL...', sub: 'INITIALIZING ASIR_NET_SUBSYSTEM' },
                { at: 70, msg: 'DECRYPTING DOSSIER ARCHIVES...', sub: 'MOUNTING WORKSPACE DIRECTORIES' },
                { at: 92, msg: 'INITIALIZING GRAPHICAL HUD...', sub: 'BATMAN BEYOND WORKSPACE READY' },
                { at: 100, msg: 'ACCESS GRANTED.', sub: 'WELCOME, VISITOR' }
            ];

            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 3) + 1;
                if (progress > 100) progress = 100;

                loadingBarFill.style.width = progress + "%";
                loadingPercent.textContent = progress + "%";

                for (let stage of bootStages) {
                    if (progress >= stage.at) {
                        loadingStatusText.textContent = stage.msg;
                        loadingSubDetail.textContent = stage.sub;
                    }
                }

                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        loadingScreen.classList.remove("active");
                        osDesktop.classList.add("active");
                    }, 800);
                }
            }, 80);
        });
    }

    // ---- Lock / Exit to Terminal ----
    if (lockBtn) {
        lockBtn.addEventListener('click', () => {
            osDesktop.classList.remove('active');
            initialScreen.classList.remove('hide-screen');
        });
    }

    // ---- Folder Click -> Open Modal Archive ----
    folderItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            const label = item.querySelector('.folder-label').textContent;
            const dataId = target.replace('modal-', 'data-');
            const dataElement = document.getElementById(dataId);

            if (dataElement && folderModal) {
                modalTitle.textContent = 'SECURE ARCHIVE // ' + label.toUpperCase();
                modalBody.innerHTML = dataElement.innerHTML;
                folderModal.classList.add('active');
            }
        });
    });

    // ---- Close Modal ----
    function closeModal() {
        if (folderModal) folderModal.classList.remove('active');
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (folderModal) {
        folderModal.addEventListener('click', (e) => {
            if (e.target === folderModal) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

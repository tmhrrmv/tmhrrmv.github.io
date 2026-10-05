// ============================================
// TELMAN MAHARRAMOV — WAYNE-TECH OS (BATMAN BEYOND)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ---- Typewriter Subtitle Animation ----
    const typewriterEl = document.getElementById('typewriterText');
    if (typewriterEl) {
        const phrases = [
            "IT Network Specialist",
            "ASIR & Cybersecurity Profile"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                charIndex--;
                typewriterEl.textContent = currentPhrase.substring(0, charIndex);
            } else {
                charIndex++;
                typewriterEl.textContent = currentPhrase.substring(0, charIndex);
            }

            let typeSpeed = isDeleting ? 38 : 75;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at complete text
                typeSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next phrase and pause briefly
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 450;
            }

            setTimeout(typeLoop, typeSpeed);
        }

        // Start 1 second after page load
        setTimeout(typeLoop, 1000);
    }

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
    const folderItems = document.querySelectorAll('.folder-item, .dock-folder');

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
                { at: 100, msg: 'BOOT COMPLETE.', sub: 'WELCOME, VISITOR' }
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
                        // Fade out loading screen, enter pure black interlude
                        loadingScreen.classList.remove("active");
                        const interludeScreen = document.getElementById("interludeScreen");
                        const interludeText = document.getElementById("interludeTypewriter");
                        if (interludeScreen && interludeText) {
                            interludeScreen.classList.add("active");
                            interludeText.textContent = "";

                            const runTypewriterSequence = async () => {
                                // Helper: type text
                                const typeText = (str, speed = 75) => {
                                    return new Promise((resolve) => {
                                        let i = 0;
                                        const t = setInterval(() => {
                                            i++;
                                            interludeText.textContent = str.substring(0, i);
                                            if (i >= str.length) {
                                                clearInterval(t);
                                                resolve();
                                            }
                                        }, speed);
                                    });
                                };

                                // Helper: backspace text
                                const deleteText = (speed = 35) => {
                                    return new Promise((resolve) => {
                                        let str = interludeText.textContent;
                                        const t = setInterval(() => {
                                            str = str.substring(0, str.length - 1);
                                            interludeText.textContent = str;
                                            if (str.length === 0) {
                                                clearInterval(t);
                                                resolve();
                                            }
                                        }, speed);
                                    });
                                };

                                const wait = (ms) => new Promise((r) => setTimeout(r, ms));

                                await wait(500);
                                // Welcome Visitor
                                await typeText("Welcome Visitor", 80);
                                await wait(2000);
                                await deleteText(35);
                                await wait(500);

                                // Reveal desktop
                                interludeScreen.classList.remove("active");
                                setTimeout(() => {
                                    osDesktop.classList.add("active");
                                }, 600);
                            };

                            runTypewriterSequence();
                        } else {
                            osDesktop.classList.add("active");
                        }
                    }, 800);
                }
            }, 80);
        });
    }

    // ---- Lock / Exit to Terminal ----
    if (lockBtn) {
        lockBtn.addEventListener('click', () => {
            const interludeScreen = document.getElementById('interludeScreen');
            if (interludeScreen) interludeScreen.classList.remove('active');
            document.body.classList.remove('folder-view-active'); osDesktop.classList.remove('active');
            initialScreen.classList.remove('hide-screen');
        });
    }

    // ---- Folder Click -> Open Modal Archive ----
    // Open Folder / Dossier with background HUD fade-out
    folderItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            const labelEl = item.querySelector('.dock-label, .folder-label');
            const label = labelEl ? labelEl.textContent.trim() : 'DOSSIER';
            const dataId = target.replace('modal-', 'data-');
            const dataElement = document.getElementById(dataId);

            if (dataElement && folderModal) {
                modalTitle.textContent = 'SECURE ARCHIVE // ' + label.toUpperCase();
                modalBody.innerHTML = dataElement.innerHTML;
                
                // Trigger modal & hide surrounding HUD elements (leaving only center logo & circle)
                document.body.classList.add('folder-view-active');
                folderModal.classList.add('active');
            }
        });
    });

    // Close modal function with smooth restoration of background HUD elements
    function closeFolderArchive() {
        if (folderModal) {
            folderModal.classList.remove('active');
        }
        document.body.classList.remove('folder-view-active');
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeFolderArchive);
    }

    if (folderModal) {
        folderModal.addEventListener('click', (e) => {
            if (e.target === folderModal) {
                closeFolderArchive();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFolderArchive();
        }
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


    /* ==========================================
       HUD CLOCK, UPTIME & VISITOR WEATHER (V12)
       ========================================== */
    // 1. Digital Clock & Date
    const hudMainTime = document.getElementById('hudMainTime');
    const hudDayName = document.getElementById('hudDayName');
    const hudDateStr = document.getElementById('hudDateStr');
    const dialSecFill = document.getElementById('dialSecFill');

    function updateHudClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = now.getSeconds();

        if (hudMainTime) hudMainTime.textContent = `${hours}:${minutes}`;
        if (osClock) osClock.textContent = `${hours}:${minutes}:${String(seconds).padStart(2, '0')}`;

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        if (hudDayName) hudDayName.textContent = days[now.getDay()];
        if (hudDateStr) hudDateStr.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

        // Dial second ring progress (0-100 dashoffset)
        if (dialSecFill) {
            const pct = (seconds / 60) * 100;
            dialSecFill.style.strokeDashoffset = 100 - pct;
        }
    }
    setInterval(updateHudClock, 1000);
    updateHudClock();

    // 2. System Uptime Counter
    const uptimeEl = document.getElementById('systemUptimeTimer');
    const systemStartTime = Date.now();

    function updateUptime() {
        if (!uptimeEl) return;
        const diffMs = Date.now() - systemStartTime;
        const totalSec = Math.floor(diffMs / 1000);
        const days = String(Math.floor(totalSec / 86400)).padStart(2, '0');
        const hrs = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSec % 60).padStart(2, '0');
        uptimeEl.textContent = `${days}:${hrs}:${mins}:${secs}`;
    }
    setInterval(updateUptime, 1000);
    updateUptime();

    // 3. Visitor Location & Weather Fetcher
    async function initVisitorWeather() {
        const locEl = document.getElementById('weatherLocation');
        const updatedEl = document.getElementById('weatherUpdated');
        const tempEl = document.getElementById('weatherTemp');
        const condEl = document.getElementById('weatherCondition');
        const humEl = document.getElementById('wHumidity');
        const feelsEl = document.getElementById('wFeels');
        const windEl = document.getElementById('wWind');
        const todayEl = document.getElementById('fcToday');
        const tmrwEl = document.getElementById('fcTomorrow');

        // Fallback default (Madrid/Europe)
        let lat = 40.4168;
        let lon = -3.7038;
        let city = "Madrid";
        let country = "Spain";

        // Attempt IP Geolocation detection
        try {
            const geoRes = await fetch('https://ipapi.co/json/');
            if (geoRes.ok) {
                const geoData = await geoRes.json();
                if (geoData.latitude && geoData.longitude) {
                    lat = geoData.latitude;
                    lon = geoData.longitude;
                    city = geoData.city || geoData.region || "Local Region";
                    country = geoData.country_name || "";
                }
            }
        } catch (e) {
            // Fallback to Intl Timezone detection
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (tz) {
                    const parts = tz.split('/');
                    city = parts[parts.length - 1].replace(/_/g, ' ');
                }
            } catch (err) {}
        }

        if (locEl) locEl.textContent = `${city}, ${country}`.replace(/,\s*$/, '');
        if (updatedEl) {
            const now = new Date();
            updatedEl.textContent = `UPDATED AT ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        }

        // Fetch Live Open-Meteo Weather
        try {
            const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
            if (wRes.ok) {
                const wData = await wRes.json();
                const cur = wData.current;
                if (tempEl) tempEl.textContent = `${Math.round(cur.temperature_2m)}°C`;
                if (humEl) humEl.textContent = `${cur.relative_humidity_2m}%`;
                if (feelsEl) feelsEl.textContent = `${Math.round(cur.apparent_temperature)}°C`;
                if (windEl) windEl.textContent = `${Math.round(cur.wind_speed_10m)} km/h`;

                // Weather code mapping
                const code = cur.weather_code;
                let condition = "Clear Sky";
                if (code >= 1 && code <= 3) condition = "Partly Cloudy";
                else if (code >= 45 && code <= 48) condition = "Fog / Mist";
                else if (code >= 51 && code <= 67) condition = "Light Rain";
                else if (code >= 71 && code <= 77) condition = "Snow Showers";
                else if (code >= 80 && code <= 82) condition = "Rain Showers";
                else if (code >= 95) condition = "Thunderstorm";

                if (condEl) condEl.textContent = condition.toUpperCase();

                if (wData.daily && wData.daily.temperature_2m_max) {
                    if (todayEl) todayEl.textContent = `${Math.round(wData.daily.temperature_2m_max[0])}° / ${Math.round(wData.daily.temperature_2m_min[0])}°`;
                    if (tmrwEl && wData.daily.temperature_2m_max[1]) {
                        tmrwEl.textContent = `${Math.round(wData.daily.temperature_2m_max[1])}° / ${Math.round(wData.daily.temperature_2m_min[1])}°`;
                    }
                }
            }
        } catch (e) {
            if (condEl) condEl.textContent = "ONLINE (STANDBY)";
            if (tempEl) tempEl.textContent = "18°C";
        }
    }

    initVisitorWeather();

});

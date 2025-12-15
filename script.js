const response = await fetch("settings.json");
    const settings = await response.json();
    const theme = settings.theme;

    // ตั้งค่าตัวแปร CSS จาก settings.json
    Object.entries({
        "--gradient-start": theme.gradientStart,
        "--gradient-end": theme.gradientEnd,
        "--circle-color": theme.circleColor,
        "--button-gradient-start": theme.buttonGradientStart,
        "--button-gradient-end": theme.buttonGradientEnd,
        "--button-text-color": theme.buttonTextColor,
        "--font": theme.fontFamily,
        "--text-color": theme.textColor // เพิ่มตัวแปร text-color ถ้ามีใน settings.json
    }).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));

    // 🎵 การจัดการวิดีโอพื้นหลัง (เสียง/เพลง)
    // แทนที่โค้ดส่วน <audio> ด้วยโค้ดสำหรับ <video> ID: "bg-video"
    const video = document.getElementById("bg-video");
    // ตั้งค่า Volume (ถ้ามีเสียงในวิดีโอ)
    if (video) {
        video.volume = 0.4;
    }
    
    let isPlaying = true;
    document.addEventListener("keydown", e => {
        // Spacebar Toggles Play/Pause
        if (e.code === "Space" && video) { 
            isPlaying ? video.pause() : video.play();
            isPlaying = !isPlaying;
        }
    });

    // 🌓 Dark / Light Toggle
    const toggle = document.getElementById("themeToggle");
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });

    // ⏳ Loading
    const loading = document.getElementById("loading-screen");
    setTimeout(() => loading.classList.add("hidden"), 1500);

    // 🟣 Circle Follow (โค้ดเดิม)
    const circle = document.getElementById("circle");
    let mouseX = 0, mouseY = 0, circleX = 0, circleY = 0;
    document.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    function animateCircle() {
        circleX += (mouseX - circleX) * 0.1;
        circleY += (mouseY - circleY) * 0.1;
        circle.style.transform = `translate(${circleX - 125}px, ${circleY - 125}px)`;
        requestAnimationFrame(animateCircle);
    }
    animateCircle();

    // ✨ Particle Effect (โค้ดเดิม)
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    const particles = [];
    function createParticle() {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 0.8 + 0.3,
            opacity: Math.random() * 0.8 + 0.2
        });
    }
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.y -= p.speedY;
            p.opacity -= 0.005;
            if (p.opacity <= 0) particles.splice(i, 1);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
            ctx.fill();
        });
    }
    function loop() {
        if (Math.random() < 0.2) createParticle();
        updateParticles();
        requestAnimationFrame(loop);
    }
    loop();

    // 🔘 Button Click (ส่วนสำคัญสำหรับการเปิดเสียง)
    document.getElementById("memberBtn").addEventListener("click", () => {
        // เมื่อผู้ใช้คลิกปุ่ม:
        if (video) {
            // 1. ตรวจสอบว่าเบราว์เซอร์ปิดเสียงวิดีโอไว้หรือไม่ (เพื่อแก้ปัญหา Autoplay Policy)
            if (video.muted) {
                video.muted = false; // 2. เปิดเสียงวิดีโอ
                // ต้องสั่งเล่นซ้ำเพื่อหลีกเลี่ยงการหยุดเล่นของเบราว์เซอร์
                video.play().catch(error => console.log("Video playback error after click:", error));
            }
        }
        
        // ไปยังหน้าต่อไป
        window.location.href = "person.html";
    });
});

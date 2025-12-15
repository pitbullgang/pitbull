/* script.js - ฉบับอัปเดต (แก้ Error ค้างหน้า Loading) */

window.addEventListener('load', function() {
    // 1. ซ่อนหน้าจอ Loading เมื่อเว็บโหลดเสร็จ
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800); // รอแป๊บนึงค่อยปิด เพื่อความสมูท
    }

    // 2. เล่นเพลงพื้นหลัง (ถ้ามี)
    const audio = document.getElementById("bg-music");
    if (audio) {
        audio.volume = 0.3; // ปรับความดัง 30%
        document.body.addEventListener('click', () => {
            if (audio.paused) audio.play();
        }, { once: true });
    }
});

// 3. เอฟเฟกต์วงกลมตามเมาส์ (Circle Follower)
const circle = document.getElementById('circle');

if (circle) {
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCircle() {
        // คำนวณให้วงกลมวิ่งตามเมาส์แบบนุ่มนวล
        const dx = mouseX - circleX;
        const dy = mouseY - circleY;
        
        circleX += dx * 0.1; // ความหน่วง (0.1 = นุ่ม, 1 = เร็ว)
        circleY += dy * 0.1;

        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';

        requestAnimationFrame(animateCircle);
    }
    
    animateCircle();
}

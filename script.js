

window.addEventListener('load', function() {
    
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800); 
    }

    
    const audio = document.getElementById("bg-music");
    if (audio) {
        audio.volume = 0.3; // ปรับความดัง 30%
        document.body.addEventListener('click', () => {
            if (audio.paused) audio.play();
        }, { once: true });
    }
});


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
        
        const dx = mouseX - circleX;
        const dy = mouseY - circleY;
        
        circleX += dx * 0.1; 
        circleY += dy * 0.1;

        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';

        requestAnimationFrame(animateCircle);
    }
    
    animateCircle();
}


document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});


document.onkeydown = function(e) {
    
    if(e.keyCode == 123) {
        return false;
    }
    
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

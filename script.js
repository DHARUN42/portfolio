const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Load one snowflake image
const snowflake = new Image();
snowflake.src = "images/snowflake.png";

const flakes = [];
const TOTAL = 30;

// Wait until image loads
snowflake.onload = () => {

    for (let i = 0; i < TOTAL; i++) {

        flakes.push({

            x: Math.random() * (canvas.width+200)-200,
            y: Math.random() * canvas.height,

            size: Math.random() * 22 + 10,

            speedY: Math.random() * 0.25 + 0.08, // Slow falling
            speedX: Math.random() * 0.15- 0.075, // Slight drift left/right

            opacity: Math.random() * 0.5 + 0.5,

            angle: Math.random() * Math.PI * 2,
            rotateSpeed: (Math.random() - 0.5) * 0.01

        });

    }

    animate();
};

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flakes.forEach(flake => {

        ctx.save();

        ctx.translate(flake.x, flake.y);
        ctx.rotate(flake.angle);
        ctx.globalAlpha = flake.opacity;

        ctx.drawImage(
            snowflake,
            -flake.size / 2,
            -flake.size / 2,
            flake.size,
            flake.size
        );

        ctx.restore();

        // Move
        flake.y += flake.speedY;
        flake.x += flake.speedX;

        // Rotate
        flake.angle += flake.rotateSpeed;

        // Reset
        if (flake.y > canvas.height + 40) {
            flake.y = -40;
            flake.x = Math.random() * (canvas.width+200)-200;
        }

        if (flake.x < -40) {
            flake.x = canvas.width + 40;
        }

        if (flake.x > canvas.width + 40) {
            flake.x = -40;
        }

    });

    requestAnimationFrame(animate);
}






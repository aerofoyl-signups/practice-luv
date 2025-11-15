// -------------------------------
// QUESTIONS
// -------------------------------
const questions = [
    "1. f(x)=x² → g(x)=f(x−3)",
    "2. f(x)=|x| → g(x)=2f(x)",
    "3. f(x)=√x → g(x)=−f(x)",
    "4. f(x)=x² → g(x)=−3f(x+1)",
    "5. f(x)=|x| → g(x)=f(2x−4)",
    "6. f(x)=√x → g(x)=4f(½(x+6))−2",
    "7. f(x)=x³ → g(x)=f(−x+5)",
    "8. f(x)=sin x → g(x)=−2 sin(3(x−π/4))+1",
    "9. f(x)=1/x → g(x)=½ f(−(x+2)) − 3",
    "10. f(x)=x² → g(x)=−(1/3)f(−2(x−4)) + 5",
    "11. f(x)=|x| → g(x)=−4f(⅓(x+9))",
    "12. f(x)=sin x → g(x)=3 sin(−½(x+2π)) − 4"
];

// -------------------------------
// CANVAS SETUP
// -------------------------------
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let lastX = 0;
let lastY = 0;

// Draw axes
function drawAxes() {
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1;

    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // y-axis
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
}

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseout", () => drawing = false);

// -------------------------------
// QUESTION SYSTEM
// -------------------------------
function newQuestion() {
    const index = Math.floor(Math.random() * questions.length);
    document.getElementById("questionText").textContent = questions[index];
    clearCanvas();
}

document.getElementById("newQuestionBtn").onclick = newQuestion;
document.getElementById("clearBtn").onclick = clearCanvas;

// Initial canvas setup
clearCanvas();

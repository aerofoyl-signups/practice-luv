// -------------------------------------
// QUESTIONS + expected functions
// -------------------------------------
const questions = [
    { q: "f(x)=x² → g(x)=f(x−3)", func: x => (x-3)**2 },
    { q: "f(x)=|x| → g(x)=2f(x)", func: x => 2*Math.abs(x) },
    { q: "f(x)=√x → g(x)=−f(x)", func: x => -(Math.sqrt(Math.max(x,0))) },
    { q: "f(x)=x² → g(x)=−3f(x+1)", func: x => -3*(x+1)**2 },
    { q: "f(x)=|x| → g(x)=f(2x−4)", func: x => Math.abs(2*x-4) },
    { q: "f(x)=√x → g(x)=4f(0.5(x+6))−2", func: x => 4*Math.sqrt(Math.max(0.5*(x+6),0))-2 },
    { q: "f(x)=x³ → g(x)=f(−x+5)", func: x => (-x+5)**3 },
    { q: "f(x)=sin x → g(x)=−2sin(3(x−π/4))+1", func: x => -2*Math.sin(3*(x-Math.PI/4))+1 },
    { q: "f(x)=1/x → g(x)=½ f(−(x+2)) − 3", func: x => 0.5*(1/(-x-2)) - 3 },
    { q: "f(x)=x² → g(x)=−(1/3)f(−2(x−4)) + 5", func: x => -(1/3)*((-2*(x-4))**2) + 5 },
    { q: "f(x)=|x| → g(x)=−4 f((x+9)/3)", func: x => -4*Math.abs((x+9)/3) },
    { q: "f(x)=sin x → g(x)=3 sin(−½(x+2π)) − 4", func: x => 3*Math.sin(-0.5*(x+2*Math.PI)) - 4 }
];

let currentFunc = null;

// -------------------------------------
// CANVAS SETUP
// -------------------------------------
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let lastX = 0;
let lastY = 0;

const gridSize = 20;
let userPoints = [];

// Map between canvas pixels and mathematical coordinates
function pxToMath(pxX, pxY) {
    let x = (pxX - canvas.width/2) / gridSize;
    let y = -(pxY - canvas.height/2) / gridSize;
    return [x, y];
}

// Draw grid + axes
function drawGrid() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;

    ctx.beginPath(); // x-axis
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();

    ctx.beginPath(); // y-axis
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
}

function clearCanvas() {
    userPoints = [];
    drawGrid();
}

// Snap pixel coordinate to nearest grid
function snap(n) {
    return Math.round(n / gridSize) * gridSize;
}

canvas.addEventListener("mousedown", e => {
    drawing = true;
    lastX = snap(e.offsetX);
    lastY = snap(e.offsetY);
});

canvas.addEventListener("mousemove", e => {
    if (!drawing) return;
    let x = snap(e.offsetX);
    let y = snap(e.offsetY);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Record snapped math coords
    userPoints.push(pxToMath(x, y));

    lastX = x;
    lastY = y;
});

canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseout", () => drawing = false);

// -------------------------------------
// NEW QUESTION
// -------------------------------------
function newQuestion() {
    let index = Math.floor(Math.random()*questions.length);
    document.getElementById("questionText").textContent = questions[index].q;
    currentFunc = questions[index].func;
    document.getElementById("resultText").textContent = "";
    clearCanvas();
}

document.getElementById("newQuestionBtn").onclick = newQuestion;
document.getElementById("clearBtn").onclick = clearCanvas;

// -------------------------------------
// CHECKING THE ANSWER
// -------------------------------------
document.getElementById("checkBtn").onclick = () => {
    if (!currentFunc) return;

    if (userPoints.length < 5) {
        document.getElementById("resultText").textContent = "Draw more of the graph!";
        return;
    }

    let errors = [];

    userPoints.forEach(([x, y]) => {
        let trueY = currentFunc(x);
        if (!isFinite(trueY)) return;
        let diff = Math.abs(trueY - y);
        if (diff > 0.7) errors.push(diff);
    });

    if (errors.length < userPoints.length * 0.2) {
        document.getElementById("resultText").textContent =
            "✅ Good! Your graph is close to the expected transformation.";
    } else {
        document.getElementById("resultText").textContent =
            "❌ Not quite. Try again!";
    }
};

// Initial load
clearCanvas();

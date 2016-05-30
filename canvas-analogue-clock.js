var imageData, canvas, ctx, cx, cy, r, x, y, a, i;
function draw() {
    canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 500;

    ctx = canvas.getContext("2d");

    cx = 250, cy = 250;
    //clock outer path
    ctx.beginPath();
    ctx.arc(cx, cy, 200, 0, 2 * Math.PI);
    ctx.stroke();

    //clock center
    ctx.beginPath();
    ctx.arc(250, 250, 5, 0, 2 * Math.PI);
    ctx.fill();

    //major hours
    ctx.font = "24px serif";
    ctx.textAlign = "center";
    ctx.fillText("12", 250, 70);
    ctx.fillText("3", 440, 250);
    ctx.fillText("6", 250, 440);
    ctx.fillText("9", 60, 250);

    //minor hours
    r = 180;
    for (i = 0; i < 12; i++) {
        if (i != 0 && i != 3 && i != 6 && i != 9) {
            a = (2 * Math.PI) * (i / 12);
            x = cx + r * Math.cos(a);
            y = cy + r * Math.sin(a);
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawHands();
    setInterval(drawHands, 1000);
}

var handsShown = {
    s: true,
    m: true,
    h: true
}

function trigger(hand) {
    handsShown[hand] = !handsShown[hand];
    drawHands();
}

function drawHands() {
    ctx.putImageData(imageData, 0, 0);
    var d = new Date();

    //seconds
    drawHand("s", d, 90, "red", 1);

    //minutes
    drawHand("m", d, 80, "blue", 3);

    //hours
    drawHand("h", d, 70, "green", 5);
}

function drawHand(hand, date, length, color, width) {
    if (!handsShown[hand]) return;
    var angleMaker = {
        s: function (d) {
            return d.getSeconds() / 60;
        },
        m: function (d) {
            return ((d.getMinutes() * 60) + d.getSeconds()) / 3600;
        },
        h: function (d) {
            return ((d.getHours() * 3600) + (d.getMinutes() * 60) + d.getSeconds()) / 43200;
        }
    }
    a = (2 * Math.PI) * angleMaker[hand](date) - (0.5 * Math.PI);
    x = cx + (r * (length / 100)) * Math.cos(a);
    y = cy + (r * (length / 100)) * Math.sin(a);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}
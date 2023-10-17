const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let Player = new player(0,0,20,0.5);
//let Walls = [new wall(-1,70,175,10), new wall(-95,-70,240,10), new wall(170,-170,10,250), new wall(-10,-70,10,150), new wall(51,0,10,10), new wall(100,26,10,10), new wall(160,-100,15,10), new wall(-1,-170,175,10), new wall(-10,-170,10,75), new wall(81,-140,10,10), new wall(-95,-105,90,10)];
//let Walls = [new wall(0,35,175,10), new wall(0,-35,177,10), new wall(175,-35,10,35), new wall(0,35,10,50), new wall(0,-80,10,53), new wall(-150,80,160,10), new wall(-150,-80,160,10), new wall(-150,-80,10,170), new wall(-50,-20,10,10), new wall(165,44,10,61), new wall(165,100,210,10), new wall(175,-91,10,60), new wall(175,-100,200,10), new wall(330,-91,10,145), new wall(250,-20,10,10), new wall(365,-65,10,166)];
let Walls = [new wall(-60,30,140,10), new wall(-60,-100,140,10), new wall(80,-90,10,120), new wall(-90,90,50,10), new wall(-40,40,10,50), new wall(-60,30,10,20), new wall(-100,20,10,70), new wall(-50,-70,20,10), new wall(-120,-190,10,100), new wall(-110,-200,190,10), new wall(80,-190,10,50), new wall(0,-161.6,20.2,20.2), new wall(-110.11,-90.09,10.01,110.11)];

requestAnimationFrame(Draw);

    // Generate random positions for 10 circles and store them in an array
    const circlePositions = [];
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 20 + 10; // Random radius between 10 and 40
        circlePositions.push({ x, y, radius });
    }
    // Function to draw a bubble-like circle
    function drawBubble(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x - Player.x / (radius/2), y - Player.y / (radius/2), radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
    }

function Draw()
{
    ctx.clearRect(0, 0, 400, 400);

    // Create a linear gradient for the background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#ffafbd"); // Starting color
    gradient.addColorStop(1, "#ffc3a0"); // Ending color
    
    // Fill the canvas with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw circles using the positions from the array
    for (const position of circlePositions) {
        drawBubble(position.x, position.y, position.radius);
    }
    
    Player.tick();
    Player.tick();
    Player.tick();
    Player.draw();
    for (let i = 0; i < Walls.length; i++) {
        Walls[i].draw(Player);
    }
    requestAnimationFrame(Draw);
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let Player = new player(0,0,20,0.5);
//let Walls = [new wall(-1,70,175,10), new wall(-95,-70,240,10), new wall(170,-170,10,250), new wall(-10,-70,10,150), new wall(51,0,10,10), new wall(100,26,10,10), new wall(160,-100,15,10), new wall(-1,-170,175,10), new wall(-10,-170,10,75), new wall(81,-140,10,10), new wall(-95,-105,90,10)];
//let Walls = [new wall(0,35,175,10), new wall(0,-35,177,10), new wall(175,-35,10,35), new wall(0,35,10,50), new wall(0,-80,10,53), new wall(-150,80,160,10), new wall(-150,-80,160,10), new wall(-150,-80,10,170), new wall(-50,-20,10,10), new wall(165,44,10,61), new wall(165,100,210,10), new wall(175,-91,10,60), new wall(175,-100,200,10), new wall(330,-91,10,145), new wall(250,-20,10,10), new wall(365,-65,10,166)];
//let Walls = [new wall(-50,50,100,10)];
let Walls = [];

let Paused = true;

requestAnimationFrame(Draw);

let Sizemode = false;

let MouseX;
let MouseY;

let OldMouseX;
let OldMouseY;

let WallW = 10;
let WallH = 10;

let PreMouseX;
let PreMouseY;

let GridSize = 10;

document.oncontextmenu = function() {
    return false;
  };

canvas.addEventListener("mousemove", function(event) {

    OldMouseX = MouseX;
    OldMouseY = MouseY;

    // get the mouse position
    MouseX = (event.clientX - 20);
    MouseY = (event.clientY - 20);

    if(Sizemode)
    {
        WallW += (MouseX - OldMouseX) / 2;
        WallH += (MouseY - OldMouseY) / 2;

        if (WallW < 1) {
            WallW = 1;
        }
        if (WallH < 1) {
            WallH = 1;
        }
    }

  });

  canvas.addEventListener("mousedown", function(event) {
    if(event.button == 0)
    {
        if(Sizemode)
        {
            let WallX = Player.x + ((PreMouseX-400)/2);
            let WallY = Player.y + ((PreMouseY-400)/2);
            WallX = Math.floor(WallX / GridSize) * GridSize;
            WallY = Math.floor(WallY / GridSize) * GridSize;

            let WallW2 = Math.floor(WallW / GridSize) * GridSize;
            let WallH2 = Math.floor(WallH / GridSize) * GridSize;

            Walls.push(new wall(WallX,WallY,WallW2,WallH2));
            Sizemode = false;
        }
        else
        {
            PreMouseX = MouseX;
            PreMouseY = MouseY;
            Sizemode = true;
            WallH = 1;
            WallW = 1;
        }
        
    }
    if(event.button == 2)
    {
        let WallX = Player.x + ((MouseX-400)/2);
        let WallY = Player.y + ((MouseY-400)/2);
        WallX = Math.floor(WallX / GridSize) * GridSize;
        WallY = Math.floor(WallY / GridSize) * GridSize;
        let WallW2 = Math.floor(WallW / GridSize) * GridSize;
        let WallH2 = Math.floor(WallH / GridSize) * GridSize;
        Walls.push(new wall(WallX,WallY,WallW2,WallH2));
    }
    if(event.button == 1)
    {
        for (let i = 0; i < Walls.length; i++) {
            if(Walls[i].isPointInside(-200 + MouseX/2,-200 + MouseY/2, Player))
            {
                Walls.splice(i,1);
                i = Walls.length;
            }
        }
    }
  });

  window.addEventListener("keydown", function (event) {
    if(event.key === " ")
    {
        Pause();
    }
  });

function Reset()
{
    Player = new player(0,0,20,0.5);
}
function Pause()
{
    Paused = !Paused;
}
function Tick()
{
    Player.tick();
    Player.tick();
}
function Delete()
{
    Walls.pop();
}

function Draw()
{
    ctx.clearRect(0, 0, 400, 400);

    if(Sizemode)
    {
        let GridSize2 = GridSize * 2;
        let WallX = Player.x + ((PreMouseX));
        let WallY = Player.y + ((PreMouseY));
        WallX = Math.floor(WallX / GridSize2) * GridSize2;
        WallY = Math.floor(WallY / GridSize2) * GridSize2;
        let WallW2 = Math.floor(WallW / GridSize) * GridSize;
        let WallH2 = Math.floor(WallH / GridSize) * GridSize;
        ctx.fillStyle = "rgba(104, 147, 227, 0.4)";
        ctx.fillRect((WallX - Player.x) / 2, (WallY - Player.y) / 2, WallW2, WallH2);
    }
    else
    {
        let GridSize2 = GridSize * 2;
        let WallX = Player.x + ((MouseX));
        let WallY = Player.y + ((MouseY));
        WallX = Math.floor(WallX / GridSize2) * GridSize2;
        WallY = Math.floor(WallY / GridSize2) * GridSize2;
        let WallW2 = Math.floor(WallW / GridSize) * GridSize;
        let WallH2 = Math.floor(WallH / GridSize) * GridSize;
        ctx.fillStyle = "rgba(81, 113, 173, 0.2)";
        ctx.fillRect((WallX - Player.x) / 2, (WallY - Player.y) / 2, WallW2, WallH2);
    }

    if(!Paused)
    {
        Player.tick();
    }

    Player.draw();
    for (let i = 0; i < Walls.length; i++) {
        Walls[i].draw(Player);
    }
    requestAnimationFrame(Draw);
}
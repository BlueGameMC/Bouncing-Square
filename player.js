class player
{
    constructor(xpos,ypos,scale,speed)
    {
        this.x = xpos;
        this.y = ypos;
        this.scale = scale;
        this.direction = 1;
        this.speed = speed;
        this.flash = 0;
    }

    tick()
    {
        if(this.direction == 1)
        {
            this.x += this.speed;
            this.y += this.speed;
        }
        if(this.direction == 2)
        {
            this.x += this.speed;
            this.y -= this.speed;
        }
        if(this.direction == 3)
        {
            this.x -= this.speed;
            this.y -= this.speed;
        }
        if(this.direction == 4)
        {
            this.x -= this.speed;
            this.y += this.speed;
        }
        for (let i = 0; i < Walls.length; i++) {
            
            let result = Walls[i].checkCollision(this);
            
            if(result.collided)
            {
                if(result.vertical || result.horizontal)
                {
                    new Audio("hit.wav").play();
                    this.flash = 1;
                }
                if(this.direction == 1)
                {
                    this.x -= this.speed;
                    this.y -= this.speed;
                }
                else if(this.direction == 2)
                {
                    this.x -= this.speed;
                    this.y += this.speed;
                }
                else if(this.direction == 3)
                {
                    this.x += this.speed;
                    this.y += this.speed;
                }
                else if(this.direction == 4)
                {
                    this.x += this.speed;
                    this.y -= this.speed;
                }

                if(result.vertical)
                { 
                    if(this.direction === 1)
                    {
                        this.direction = 2;
                    }
                    else if(this.direction === 2)
                    {
                        this.direction = 1;
                    }
                    else if(this.direction === 3)
                    {
                        this.direction = 4;
                    }
                    else if(this.direction === 4)
                    {
                        this.direction = 3;
                    }
                }
                if(result.horizontal)
                { 
                    if(this.direction === 1)
                    {
                        this.direction = 4;
                    }
                    else if(this.direction === 2)
                    {
                        this.direction = 3;
                    }
                    else if(this.direction === 3)
                    {
                        this.direction = 2;
                    }
                    else if(this.direction === 4)
                    {
                        this.direction = 1;
                    }
                }

                if(this.direction == 1)
                {
                    this.x += this.speed;
                    this.y += this.speed;
                }
                else if(this.direction == 2)
                {
                    this.x += this.speed;
                    this.y -= this.speed;
                }
                else if(this.direction == 3)
                {
                    this.x -= this.speed;
                    this.y -= this.speed;
                }
                else if(this.direction == 4)
                {
                    this.x -= this.speed;
                    this.y += this.speed;
                }
            }
        }
            

    }

    draw()
    {
        ctx.fillStyle = "#8c64a8"
        ctx.fillRect(200 - this.flash * 0.5, 200 + this.flash * 0.5, this.scale + this.flash, this.scale + this.flash);
        ctx.fillStyle = "rgba(255,255,255," + this.flash * 0.5 + ")"
        ctx.fillRect(200 - this.flash * 0.5, 200 + this.flash * 0.5, this.scale + this.flash, this.scale + this.flash);
        ctx.strokeStyle = "#5E3C69"
        ctx.lineWidth = 2;
        ctx.strokeRect(200 - this.flash * 0.5, 200 + this.flash * 0.5, this.scale + this.flash, this.scale + this.flash);

        if(this.flash > 0)
        {
            this.flash *= 0.95;
        }

    }

}
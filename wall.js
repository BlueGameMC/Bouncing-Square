class wall
{
    constructor(xpos,ypos,width,height)
    {
        this.x = xpos;
        this.y = ypos;
        this.width = width;
        this.height = height;
    }

    /*
    checkCollision(player)
    {
        // Check if the rectangles intersect on the x-axis
        if (player.x < this.x + this.width && player.x + player.width > this.x) {
          // Check if the rectangles intersect on the y-axis
          if (player.y < this.y + this.height && player.y + player.height > this.y) {
            // The rectangles collide
            return true;
          }
        }
        // The rectangles do not collide
        return false;
    }
    */

    checkCollision(player) {
        // Initialize the collision result object
        const collisionResult = {
          collided: false,
          vertical: false,
          horizontal: false,
        };
      
        // Check if the rectangles intersect on the x-axis
        if (player.x < this.x + this.width && player.x + player.scale > this.x) {
          // Check if the rectangles intersect on the y-axis
          if (player.y < this.y + this.height && player.y + player.scale > this.y) {
            // The rectangles collide
            collisionResult.collided = true;
      
            // Check if it's a vertical or horizontal collision
            const xOverlap = Math.min(player.x + player.scale, this.x + this.width) - Math.max(player.x, this.x);
            const yOverlap = Math.min(player.y + player.scale, this.y + this.height) - Math.max(player.y, this.y);
      
            if (xOverlap < yOverlap) {
              collisionResult.horizontal = true;
            } else if (yOverlap < xOverlap) {
              collisionResult.vertical = true;
            }
          }
        }
      
        return collisionResult;
      }
      
    isPointInside(x, y, player) {
      return x >= this.x - player.x && x <= this.x - player.x + this.width &&
             y >= this.y - player.y && y <= this.y - player.y + this.height;
    }  
    
    draw(player)
    {
        ctx.fillStyle = "#5171AD";
        ctx.fillRect(200 + this.x - player.x,(200 + this.y - player.y), this.width, this.height);
    }

}
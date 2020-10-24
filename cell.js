function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.walls = {
        top: true,
        right: true,
        bottom: true,
        left: true
    }
    this.visited = false;
    this.colorValue = this.colorValueMin = 100;
    this.colorValueMax = 255;
    this.colorMode = true;

    this.checkNeighbors = function() {
        var neighbors = [];

        if (grid[this.x][this.y + 1])
            var top = grid[this.x][this.y + 1];
        if (grid[this.x + 1] && grid[this.x + 1][this.y])
            var right = grid[this.x + 1][this.y];
        if (grid[this.x][this.y - 1])
            var bottom = grid[this.x][this.y - 1];
        if (grid[this.x - 1] && grid[this.x - 1][this.y])
            var left = grid[this.x - 1][this.y];

        if (top && !top.visited)
            neighbors.push(top);
        if (right && !right.visited)
            neighbors.push(right);
        if (bottom && !bottom.visited)
            neighbors.push(bottom);
        if (left && !left.visited)
            neighbors.push(left);

        var random = floor(Math.random() * neighbors.length);
        return neighbors[random];
    }

    this.removeWalls = function(next) {
        let x = this.x - next.x,
            y = this.y - next.y;

        if (x === 1) {
            this.walls.left = false;
            next.walls.right = false;
        } else if (x === -1) {
            next.walls.left = false;
            this.walls.right = false;
        }
        if (y === 1) {
            this.walls.top = false;
            next.walls.bottom = false;
        } else if (y === -1) {
            next.walls.top = false;
            this.walls.bottom = false;
        }
    }

    this.show = function(cellSize) {
        if (this.colorMode) this.colorValue++;
        else this.colorValue--;
        if (this.colorValue == this.colorValueMin || this.colorValue == this.colorValueMax) this.colorMode = !this.colorMode;
        stroke(255);
        let x = this.x * cellSize;
        let y = this.y * cellSize;
        // rect(x, y, cellSize, cellSize);
        if (this.walls.top && this.visited)
            line(x, y, x + cellSize, y);
        if (this.walls.right && this.visited)
            line(x + cellSize, y, x + cellSize, y + cellSize);
        if (this.walls.bottom && this.visited)
            line(x, y + cellSize, x + cellSize, y + cellSize);
        if (this.walls.left && this.visited)
            line(x, y + cellSize, x, y);
        if (this.visited) {
            noStroke();
            fill(this.colorValue, 0, this.colorValue, 150);
            // fill(255, 0, 255, 100);
            rect(x, y, cellSize, cellSize);
        }
    }

    this.highLight = function() {
        let x = this.x * cellSize;
        let y = this.y * cellSize;
        noStroke();
        fill(0, 255, 0, 255);
        rect(x, y, cellSize, cellSize);
    }
}
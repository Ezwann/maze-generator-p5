var cellSize;
var grid = [],
    stack = [],
    rows, cols, current;

function setup() {
    cellSize = GCD();
    if (cellSize < 15) cellSize = 15;
    createCanvas(windowWidth, windowHeight);
    rows = ceil(width / cellSize);
    cols = ceil(height / cellSize);
    buildGrid();
    current = grid[floor(random(0, rows))][floor(random(0, cols))];
    current.visited = true;
}

function draw() {
    background(0);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].show(cellSize);
        }
    }
    current.visited = true;
    var next = current.checkNeighbors();
    if (next) {
        current.highLight();
        stack.push(current);
        current.removeWalls(next);
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
        current.highLight();
    }
}

function buildGrid() {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }
}

function GCD(a = windowWidth, b = windowHeight) {
    if (b == 0) return a;
    else return GCD(b, a % b);
}
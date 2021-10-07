// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


let cols;                     // Number of columns and rows in the grid
let rows;

let fireflies = [];
let spacer = 50;

let timeOffset_neighbors = 0;
let avg = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = windowWidth / spacer;
  rows = windowHeight / spacer;
  noStroke();

  for (let i = 0; i < cols; i++) {
    fireflies[i] = [];
    for (let j = 0; j < rows; j++) {
      let fireflyOffset = random(50000000);
      fireflies[i][j] = new Firefly(i * spacer, j * spacer, 10, fireflyOffset);
    }
  }
}


function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fireflies[i][j].timeOffset = averageNeighbors(i, j);
      fireflies[i][j].flash();
    }
  }
}


function averageNeighbors(i, j) {
  let sum = 0;
  let avg = 0;
  for (let x = -1; x < 2; x++) {            //  Looking at all the neighbors in the columns
    if (i + x < 0 || i + x >= cols) {           //  If the neighbors go off the edge, break
      break;
    }
    for (let y = -1; y < 2; y++) {          //  Looking at all the neighbors in the rows
      if (j + y < 0 || j + y >= rows) {         //  If the neighbors go off the edge, break
        break;
      }
      sum += fireflies[i+x][j+y].timeOffset;         //  Adding all the values of the neighbors
    }
  }
  avg = sum/9;
  return avg;
}


class Firefly {            // A Firefly object knows about its location in the grid as well as its size with the variables x,y,w,h.
  constructor(tempX, tempY, diameter, timeOffset) {
    this.tempX = tempX;
    this.tempY = tempY;
    this.diameter = diameter;
    this.timeOffset = timeOffset;
  }

  flash() {
    let angle = random(6);
    let t = millis();
    if ((t + this.timeOffset) % 1120 <= 400) {
      strokeWeight(.8);
      stroke(255, 255, 0);
      noFill();
      arc(this.tempX, this.tempY, 7, 7, 0 + angle, PI + angle);
    } else {
      strokeWeight(0);
      stroke(100);
      ellipse(this.tempX, this.tempY, 2, 2);
      fill(50);
    }
    strokeWeight(0);
    stroke(100);
    ellipse(this.tempX, this.tempY, 2, 2);
    fill(50);
  }

  mouseInterruption() {
    if ((this.tempX < mouseX + 50 && this.tempX > mouseX - 50) && (this.tempY < mouseY + 50 && this.tempY > mouseY - 50)) { // manipulating firefly with mouse
      fill(255, 0 , 0);
      ellipse(mouseX, mouseY, 15, 15);
      this.timeOffset = random(500000);
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fireflies[i][j].mouseInterruption();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

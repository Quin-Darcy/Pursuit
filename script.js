// Constants
let W = window.innerWidth;
let H = window.innerHeight;
let num_of_points = 109;
let smoothness = 700; // Formely step size. Controls speed or "smoothness" of path.
let R = 1;             // Radius for ellipse
let POS = 1;           // Set to 0 for random poistion. 1 for equidistant
let RADIUS = 1;        // Radius for equidistant positioining
let THETA = 0;         // Angle between each equidistant point
let COLOR = 0;         // Set to 0 for black. 1 for color
let LINE = 0;

let count = 0;

// Arrays
let points = [];
let points_color = [];

function setup() {
    createCanvas(W, H);
    background(0);
    for (let i = 0; i < num_of_points; i++) {
        if (POS === 0) {
            points.push([floor(random(W)), floor(random(H))]);
        } else {
            if (W >= H) {
                RADIUS = floor((H - 100) / 2);
            } else {
                RADIUS = floor((W - 100) / 2);
            }
            THETA = 2 * (Math.PI / num_of_points);
            points.push([RADIUS * Math.cos(i * THETA) + W / 2, RADIUS * Math.sin(i * THETA) + H / 2]);
        }
    
        if (COLOR === 0) {
            if (i % 2 === 0) {
                points_color.push([floor(random(255)), floor(random(255)), floor(random(255))]);
            } else {
                points_color.push([255 - points_color[i-1][0], 255 - points_color[i-1][1], 255 - points_color[i-1][2]]);
            }
        } else if (COLOR === 1) {
            points_color.push([255, 255, 255]);
        }
    }
    
}

function advance() {
    let fc = frameCount / 100;
    for (let i = 1; i < points.length; i++) {
        points[i][0] += (points[i-1][0] - points[i][0]) / (smoothness / fc);
        points[i][1] += (points[i-1][1] - points[i][1]) / (smoothness / fc);
    }
    points[0][0] += (points[points.length - 1][0] - points[0][0]) / (smoothness / fc);
    points[0][1] += (points[points.length - 1][1] - points[0][1]) / (smoothness / fc);
}

function draw() {
    background(0);
    if (LINE === 0) {
        for (let i = 0; i < points.length; i++) {
            fill(points_color[i][0], points_color[i][1], points_color[i][2]);
            noStroke();
            ellipse(points[i][0], points[i][1], R);
        }
    } else {
        for (let i = 0; i < points.length-1; i++) {
            fill(points_color[i][0], points_color[i][1], points_color[i][2]);
            noStroke();
            ellipse(points[i][0], points[i][1], R);
            stroke(points_color[i][0], points_color[i][1], points_color[i][2]);
            line(points[i][0], points[i][1], points[i+1][0], points[i+1][1]);
        }
        fill(points_color[0][0], points_color[0][1], points_color[0][2]);
        line(points[0][0], points[0][1], points[1][0], points[1][1]);
        fill(points_color[points_color.length - 1][0], points_color[points_color.length - 1][1], points_color[points_color.length - 1][2]);
        noStroke();
        ellipse(points[points.length - 1][0], points[points.length - 1][1], R);
    }
    advance();
}

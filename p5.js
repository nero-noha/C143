function setup() {
    let canvas = createCanvas(400, 300); // Set the canvas size
    canvas.parent('canvas-container'); // Place the canvas inside the div
}

let video;

function setup() {
    let canvas = createCanvas(400, 300);
    canvas.parent('canvas-container');

    video = createCapture(VIDEO);
    video.size(width, height); // Set the size to match the canvas
    video.hide(); // Hide the video component
}

function draw() {
    background(0); // Clear the canvas
    image(video, 0, 0, width, height); // Draw the webcam video on the canvas
}

let poseNet;

function setup() {
    // ... (previous code)

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
    console.log('Model is loaded');
}

// Define the variable to hold the game status at line 28
let gameStatus = "initial"; // You can initialize it as needed

function startGame() {
    // ... (other code in the function)

    // Inside the startGame() function, update the gameStatus variable and the element with id "status"
    gameStatus = "start"; // Update game status to "start"
    document.getElementById("status").innerHTML = "Game Is Loaded";
}

function draw() {
    // ... (other code in the function)

    // Inside the if condition at line 67 of the draw() function, check if the game status is equal to "start"
    if (gameStatus === "start") {
        // Your code to handle the game logic when the status is "start"
    }
}

let rwristX, rwristY;
let rwristScore;

function setup() {
    // ... (other setup code)

    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        rwristX = results[0].pose.rightWrist.x;
        rwristY = results[0].pose.rightWrist.y;
        rwristScore = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    // ... (other draw code)

    if (rwristScore > 0.2) {
        fill(255, 0, 0); // Red color (change to your desired color)
        stroke(255, 0, 0); // Red color (change to your desired color)
        circle(rwristX, rwristY, 50); // Adjust the diameter as needed
    }
}

let ballTouchPaddleSound;
let missedSound;

function preload() {
    ballTouchPaddleSound = loadSound('ball_touch_paddle.wav');
    missedSound = loadSound('missed.wav');
}

// Replace mouseY with the right wrist's y coordinate
let rightWristY = rwristY; // Assuming rwristY holds the right wrist's y coordinate
paddle1Y = rightWristY - paddleHeight / 2; // Adjust as needed

function move() {
    // ... (other code)

    if (ballX >= width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            // Ball touches the paddle
            ballTouchPaddleSound.play(); // Play the "ball_touch_paddle" sound
            ballSpeedX = -ballSpeedX;
        } else {
            // Ball misses the paddle
            missedSound.play(); // Play the "missed" sound
            playerScore++;
            reset();
        }
    }
}

function restart() {
    pcscore = 0; // Reset computer's score
    playerScore = 0; // Reset player's score
    loop(); // Restart the game
}

function move() {
    // ... (other code)

    if (ballX > width) {
        fill(255);
        textSize(60);
        text('Game Over', width / 2 - 150, height / 2);
        noLoop();
    }
}


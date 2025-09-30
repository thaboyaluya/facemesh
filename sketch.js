/*
  Hand Pose Interaction
  - ON SCREEN MENU: Hover and click on items using your finger tips.
  - Hover on items with your finger tip: 🫵
  - Click on items with two fingers: ✌🏻

  Related to this post: https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose
  A fun project based on Daniel Shiffman's ML5.js hand pose detection.
*/


// Menu Item Only
// Click by mouse
// https://editor.p5js.org/peymanx/sketches/blBfJ2FKh

// Variables for Hand Pose, Video Feed, and Menu System
let handPose;
let video;
let hands = [];
let finger;
let hovering = false;

let menuItems = [];      // Array to store menu items for different levels
let menuLevel = 0;       // Keeps track of the current menu level

// Preload function to load the hand pose model
function preload() {
  // Load the handPose model (flipped for mirrored effect)
  handPose = ml5.handPose({ flipped: true });
}

// Setup function to initialize video, canvas, and menu items
function setup() {
  // Create canvas for rendering
  createCanvas(640, 480);

  // Create a video capture object and hide it (for hand pose detection)
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();  // Hide the video feed since it's only used for hand detection

  // Start hand pose detection on the video feed
  handPose.detectStart(video, gotHands);

  // Define Home menu items (Level 1)
  let gallery = new Item("Gallery", 100, 80, 440, 65, () => {
    menuLevel = 1;  // Go to Gallery menu (Level 2)
  });
  let about = new Item("About", 100, 180, 440, 65, () => {
    message("youtube.com/@peymanx", "red");  // Show a message on About
  });
  let exit = new Item("Exit", 100, 280, 440, 65, () => {
    message("Good bye");  // Exit message
  });

  // Define Gallery menu items (Level 2)
  let photo = new Item("Pictures", 100, 80, 440, 50);
  let music = new Item("Music", 100, 150, 440, 50);
  let video_ = new Item("Videos", 100, 220, 440, 50, () => {
    message("ACCESS DENY", "blue");  // Show access denied message for Videos
  });
  let download = new Item("Downloads", 100, 290, 440, 50);
  let back = new Item(" < Back", 100, 360, 440, 50, () => {
    menuLevel = 0;  // Go back to the Home menu (Level 1)
  });

  // Organize menu items into levels
  menuItems[0] = [gallery, about, exit];  // Level 1 (Home)
  menuItems[1] = [photo, music, video_, download, back];  // Level 2 (Gallery)
  menuItems[2] = [back];  // Level 3 (Back button only)
}

// Function to display a message on the screen
function message(msg, color = "white") {
  textAlign(CENTER);  // Center the text
  strokeWeight(2);     // Add stroke around the text
  textSize(40);        // Set text size
  fill(color);         // Set the text color
  text(msg, width / 2, height - 30);  // Display the message at the bottom of the screen
}

// Main draw loop to handle hand pose interaction and menu rendering
function draw() {
  // Draw the video feed on the canvas
  let x = 0;
  let y;
  let clicked = false;

  image(video, 0, 0, width, height);

  // Draw all the tracked hand points and detect hand gestures
  for (let hand of hands) {
    finger = hand.index_finger_tip;  // Get the tip of the index finger
    let middle = hand.middle_finger_tip; // Get the tip of the middle finger

    x= finger.x;
    y= finger.y;
    // Detect if two fingers are close enough to simulate a click
    clicked = dist(finger.x, finger.y, middle.x, middle.y) <30;
    

  
  }
  // Loop through menu items for the current menu level
  let items = menuItems[menuLevel];
  for (let item of items) {
    if (item.isHighlighted(x, y)) {
      item.highlighted();  // Highlight item when hovered
      pfinger= finger;
      hovering = true;
      if (clicked) {
        item.run();  // Execute item’s action when clicked
      }
    } else {
      item.draw();  // Draw item normally
    }
  }
}

// Callback function to handle the results from hand pose detection
function gotHands(results) {
  // Update the hands variable with the latest hand detection results
  hands = results;
}



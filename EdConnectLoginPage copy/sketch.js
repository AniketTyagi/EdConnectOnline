// Declare global variables

var usernameIn, passwordIn, signIn;
var img;
var particleArray = [];
var usernameBar = new textBar("username");
var passwordBar = new textBar("password");
var signBar = new textBar("signin");
var circDist = 100;
var font, font2, fontsize;
var modifier = 1;
var screenRefresh = 1;

// Preload images and fonts

function preload() {
  font = loadFont('assets/SourceSansProFile/SourceSansPro-Semibold.otf')
  font2 = loadFont('assets/SourceSansProFile/SourceSansPro-Light.otf');
  img = loadImage('assets/EdConnectLogoTwo.png');
  fontsize = 12;
}

// Initializer

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // Define colors
  usernameIn = createInput("Username", 'text');
  passwordIn = createInput('Password', 'password');
  signIn = createButton('SIGN IN');
  signIn.class('button');
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER);
  for(var i = 0; i < 75; i++) {
    particleArray[i] = new FloatingParticle(random() * window.innerWidth, random() * window.innerHeight);
  }
}

// Compilation of all functions to render webpage

function draw() {
  background(23,157,228);
  renderParticles();
  renderLine();
  strokeWeight(0);
  renderMainScreen();
  usernameBar.render();
  passwordBar.render();
  signBar.render();
}

// Below are the two function that manipulate the DOM on the page

function renderMainScreen() {
  // These are modifiable x and y values for the rectangle being rendered for easier development
  var long = 750;
  var high = 430;
  modifier = 1;
  
  // Modifies the screen coefficient based on current screen size parameters
  if(window.innerWidth < 800 || window.innerHeight < 643) {
    if(window.innerWidth / 800 < window.innerHeight / 643) {
     modifier = window.innerWidth / 800;
    } else {
     modifier = window.innerHeight / 643;
    }
  }
  
  // Modifies values with screen coefficient
  long = 750 * modifier;
  high = 430 * modifier;
  circDist = 100 * modifier;
  var modX = (window.innerWidth - long) / 2;
  var modY = (window.innerHeight - high) / 2;
  
  // Renders the general login screen outline
  fill(19,108,164, 140);
  stroke(19,108,164, 140);
  rect(window.innerWidth / 2, modY, long / 2, high, 0, 5, 5, 0);
  fill(255);
  stroke(255);
  rect(modX, modY, long/2, high, 5, 0, 0, 5);
  
  // Render the login screen text
  fill(123,123,123);
  textSize(fontsize * modifier);
  textAlign(CENTER);
  textFont(font);
  textSize(12 * modifier);
  image(img, modX + 60.67464 * modifier, modY + 50 * modifier, 1.5 * 154.25 * modifier, 1.5 * 47.75 * modifier)
  text("WELCOME TO", modX + long/4, modY + 70 * modifier)
  fill(255);
  textSize(26 * modifier);
  textFont(font2);
  textAlign(LEFT);
  text("A better way to", modX + (2.25 *long / 4), modY + 100 * modifier)
  text("manage your classroom.", modX + (2.25 *long / 4), modY + 130 * modifier)
  textSize(12 * modifier);
  text("EdConnect allows you to manage, track, and gauge \n your classroom and your students more effectively. \n This is done through:", modX + (2.25 *long / 4), modY + 160 * modifier)
  text("- Composite scores helping foster classroom subject skills", modX + (2.25 *long / 4), modY + 220 * modifier)
  text("- Virtual classroom aiding lesson plan implementation", modX + (2.25 *long / 4), modY + 250 * modifier)
  text("- Virtual grading easing student score management", modX + (2.25 *long / 4), modY + 280 * modifier)
  text("- Virtual assistant predicting normalized student behaviour", modX + (2.25 *long / 4), modY + 310 * modifier)
  
  if(screenRefresh == 1) {
    console.log(modifier);
    usernameBar.xpos = modX + long/12;
    usernameBar.ypos = modY + high/2.5;
    usernameBar.bl = 2 * (modX + long/4 - usernameBar.xpos);
    passwordBar.xpos = modX + long/12;
    passwordBar.ypos = modY + high/2;
    passwordBar.bl = 2 * (modX + long/4 - passwordBar.xpos);
    signBar.xpos = modX + long/12.35;
    signBar.ypos = modY + high/1.675;
    signBar.bl = 2 * (modX + long/4 - passwordBar.xpos);
    screenRefresh =0;
  }
}

function textBar(type) {
  this.xpos;
  this.ypos;
  this.bl;
  
  this.render = function() {
    // Determines size of text box
    var size = 28;
    
    if(type == "username") {
      usernameIn.position(this.xpos, this.ypos);
      usernameIn.size(this.bl, size * modifier);
    } else if (type == "password"){
      passwordIn.position(this.xpos, this.ypos);
      passwordIn.size(this.bl, size * modifier);
    } else {
      signIn.position(this.xpos, this.ypos);
      signIn.size(this.bl, size * modifier);
    }
  }
}

// Below are the three functions responsible for making the interactive background

function renderParticles() {
  for(var i = 0; i < particleArray.length; i++) {
    // Parses through all particle object instances and moves, renders, repels, and edge detects them
    particleArray[i].move();
    particleArray[i].edge();
    particleArray[i].repel();
    particleArray[i].render();
  }
}

function renderLine() {
  // Renders lines between the floating particles
  strokeWeight(modifier);
  for(var i = 0; i < particleArray.length; i++) {
    for(var j = 0; j < particleArray.length; j++) {
      var distance = dist(particleArray[i].xpos, particleArray[i].ypos, particleArray[j].xpos, particleArray[j].ypos);
      if(distance < circDist) {
        stroke(255, 255, 255, map(distance, 0, circDist, 255, 0));
        line(particleArray[i].xpos, particleArray[i].ypos, particleArray[j].xpos, particleArray[j].ypos);
      }
    }
  }
}

function FloatingParticle(xpos, ypos) {
  // Sets up parameters for each particle on screen
  this.xpos = xpos;
  this.ypos = ypos;
  this.xvel = random() * 4 - 2;
  this.yvel = random() * 4 - 2;
  this.xacc = 0;
  this.yacc = 0;
  
  this.render = function() {
    // Renders particles as empty circle with borders only
    stroke(255);
    fill(255);
    ellipse(this.xpos, this.ypos, 3 * modifier, 3 * modifier);
  }
  
  this.move = function() {
    // Calculates magnitude of velocity and updates particles velocities with respect to its acceleration
    var magnitude = sqrt(pow(this.xvel, 2) + pow(this.yvel, 2));
    this.xvel += this.xacc;
    this.yvel += this.yacc;
    
    if(magnitude > 2) { 
      // Caps velocity if velocity is greater than 2
      this.xvel = (2 * this.xvel / magnitude);
      this.yvel = (2 * this.yvel / magnitude);
      this.yacc = this.xacc = 0;
    }
    
    // Updates the position of the particle with respect to its velocity
    this.xpos += this.xvel;
    this.ypos += this.yvel;
  }
  
  this.edge = function() {
    // Shifts particles to opposite side of screen if it goes beyond screen borders
    if(this.xpos > window.innerWidth) {
     this.xpos = 2;
    } else if(this.xpos < 0) {
      this.xpos = window.innerWidth - 2;
    }
    if(this.ypos > window.innerHeight) {
      this.ypos = 2;
    } else if(this.ypos < 0) {
      this.ypos = window.innerHeight - 2;
    }
  }
  
  this.repel = function() {
    // Calculates particle distance from mouse to then calculate negative newtonian gravity force
    var distance = dist(mouseX, mouseY, this.xpos, this.ypos);
    if(distance > 1 && distance < circDist) {
      this.xacc = -10000 / pow(distance, 2) * (mouseX - this.xpos) / distance;
      this.yacc = -10000 / pow(distance, 2) * (mouseY - this.ypos) / distance;
    }
    
    // Calculate Newtonian gravity force from screen edges
    distance = abs(0 - this.ypos);
    this.yacc += -10 / pow(distance, 2) * (-this.ypos) / distance;
    distance = abs(window.innerHeight - this.ypos);
    this.yacc += -10 / pow(distance, 2) * (window.innerHeight - this.ypos) / distance;
    distance = abs(0 - this.xpos);
    this.xacc += -10 / pow(distance, 2) * (-this.xpos) / distance;
    distance = abs(window.innerWidth - this.xpos);
    this.xacc += -10 / pow(distance, 2) * (window.innerWidth - this.xpos) / distance;
    
    // Applies Newtonian gravity force on every particles from every other particle
    for(var i = 0; i < particleArray.length; i++) {
      distance = dist(this.xpos, this.ypos, particleArray[i].xpos, particleArray[i].ypos);
      if(distance > 1 && distance < 100) {
        this.xacc += -100 / pow(distance, 2) * (particleArray[i].xpos - this.xpos) / distance;
        this.yacc += -100 / pow(distance, 2) * (particleArray[i].ypos - this.ypos) / distance;
      }
    }
  }
}

// Located below is the resize function that will activate screen refresh everytime the window changes

function windowResized() {
  screenRefresh = 1;
}
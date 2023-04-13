let startSim = false;
let startExpl = false;
let settings;

let keySize = 128;
let xSpeed = 1;
let eveIntercept = true;

let sim = new BB84();
let am = new AnimManager();

let ap;
let ep;
let ab;
let ae;

// Function to actually run the simulation in order to get data for the animation.
function main() {
    sim.runProtocol(keySize, eveIntercept);
    sim.simResults();


    ap = am.getAlicePhotons();
    ep = am.getEvePhotons();

    ab = am.getBobMeasure();
    ae = am.getEveMeasure();
    
}

function rerunSim() {
    if(!keySize) { keySize = 128; }
    if(!xSpeed) { xSpeed = 1; }
    if(!eveIntercept) { eveIntercept = false; }

    sim = new BB84();

    sim.runProtocol(keySize, eveIntercept);
    sim.simResults();

    ap = am.getAlicePhotons();
    ep = am.getEvePhotons();

    ab = am.getBobMeasure();
    ae = am.getEveMeasure();

}

let alice;
let bob;
let eve;

let bobBasis;
let eveBasis;

let zeroDeg;
let fortyfiveDeg;
let ninetyDeg;
let hundredthirtyfiveDeg;

let x = window.innerWidth * (1/3);

let photon;
let photonDesc;

let cof;
let kent;

let inc = 0;


// P5 function.
function setup() {
    createCanvas(window.innerWidth * (63/64), window.innerHeight * (63/64));
    textSize(16);
    fill(255, 255, 255);
}

// P5 function.
function preload() {
    alice = loadImage('alice.png');
    bob = loadImage('bob.png');
    eve = loadImage('eve.png');

    plusMeasure = loadImage('+measure.png');
    xMeasure = loadImage('xmeasure.png');

    photon = zeroDeg;

    zeroDeg = loadImage('1+0.png');
    fortyfiveDeg = loadImage('0x45.png');
    ninetyDeg = loadImage('0+90.png');
    hundredthirtyfiveDeg = loadImage('1x135.png');

    cof = loadImage('cof.png');
    kent = loadImage('kent.png');


    image(photon, window.innerWidth * (1/3), window.innerHeight * (1/3), 32, 32);
    
}

// P5 function that drives the entire animation.
function draw() {
    background(100, 100, 200);

    if(startSim && !startExpl) {
        if(inc < keySize) { drawSim(); }
        if(inc >= keySize) {
            if(confirm('Restart Animation?')) {
               inc = 0;
               x = window.innerWidth * (1/3);
            }
            else {
                startSim = false;
            }
        }
    } else if(!startExpl) {
        drawStart();
        drawCredits();
    } else if(startExpl) {
        drawExpl();
    }
}

// Draws the home screen
function drawStart() {
    background(100, 100, 200);
    
    textSize(64);
    textAlign(CENTER);
    text('BB84 Quantum Key Distribution', window.innerWidth * (1/2), window.innerHeight * 1/8);
    textAlign(LEFT);

    homeButton = createButton('Home');
    homeButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6) - 64);
    homeButton.mousePressed(home);

    startStopButton = createButton('Start / Stop');
    startStopButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6) + 32);
    startStopButton.mousePressed(pauseAnim);

    settingsButton = createButton('Settings');
    settingsButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6) - 32);
    settingsButton.mousePressed(openSettings);

    infoButton = createButton('Research');
    infoButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6));
    infoButton.mousePressed(openResearch);

    explButton = createButton('Explanation');
    explButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6) + 64);
    explButton.mousePressed(openExpl);

    image(cof, window.innerWidth * (1/2) - 325, window.innerHeight * (1/3) - 48, 300, 300);
    image(kent, window.innerWidth * (1/2) + 25, window.innerHeight * (1/3) - 4, 210, 210);

    textSize(32);
    textAlign(CENTER);
    text('Scroll down for more info!', window.innerWidth * (1/2), window.innerHeight * 7/8);
    textAlign(LEFT);
    x += 1;

}

// Animates and explanation of BB84
function drawExpl() {
    background(100, 100, 200);
    textSize(32);

    text(inc + ' / 18', window.innerWidth * (3/64), window.innerHeight * (4/64));

    fill(110, 110, 210);
    rect(window.innerWidth * (1/64), window.innerHeight * (1/64), 16, (window.innerWidth * (2/3) - window.innerWidth * (1/3)) * 5/4);

    fill(255, 255, 255);

    rect(window.innerWidth * (1/64), window.innerHeight * (1/64), 16, (x - innerWidth * (1/3)) * 5/4);
    fill(255, 255, 255);

    x++;

    switch(inc) {
        case 0:
            textSize(32);
            textAlign(CENTER);
            text('This is an animated explanation of the BB84 protocol.\n\nIf you would like to end the explanation click the "Home" button to return to the home screen.', window.innerWidth * (1/2), window.innerHeight * (1/3));
            text('The bar represents how much time is left per animation.', window.innerWidth * (1/2), window.innerHeight * (2/3))
            textAlign(LEFT);
            break; 

        case 1:
            textSize(32);
            textAlign(CENTER);
            text('BB84 uses photons to create secure keys.\nHence why it is called a Quantum Key Distribution.', window.innerWidth * (1/2), window.innerHeight * (1/3));
            textAlign(LEFT);
            x++;
            break; 

        case 2:
            textAlign(CENTER);
            text('It involves two people\nAlice and Bob.', window.innerWidth * (1/2), window.innerHeight * (1/3));
            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            break;

        case 3:
            image(zeroDeg, x, window.innerHeight * (1/3), 96, 96);
            text('\n\n\t\t\tThese yellow circles\nrepresent photons being sent\n\tbetween Alice and Bob.', x - 148, window.innerHeight * (1/2));

            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            break;

        case 4:
            image(fortyfiveDeg, x, window.innerHeight * (1/3), 96, 96);
            text('\n\nEach photon has three values.', x - 148, window.innerHeight * (1/2));
            textSize(16);
            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            break;

        case 5:

            image(ninetyDeg, x, window.innerHeight * (1/3), 96, 96);
            text('\n\nBasis, Polarization, and Bit', x - 148, window.innerHeight * (1/2));
            textSize(16);

            text('\n\nBasis: + / x\nPolarization: 0°, 45°, 90°, 135°\nBit: 0 / 1', x - 96, window.innerHeight * (1/2) + 64);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            break;

        case 6:
            text('There are four variations of photons.', window.innerWidth * (1/3) + 64, window.innerHeight * 1/8);

            text('0°', window.innerWidth * (1/4) - 64, window.innerHeight * (1/4)- 32);
            image(zeroDeg, window.innerWidth * (1/4) - 96, window.innerHeight * (1/4));

            text('90°', window.innerWidth * (1/4) - 64, window.innerHeight * (3/4)- 32);
            image(ninetyDeg, window.innerWidth * (1/4) - 96, window.innerHeight * (3/4));


            text('45°', window.innerWidth * (3/4) - 64, window.innerHeight * (1/4)- 32);
            image(fortyfiveDeg, window.innerWidth * (3/4) - 96, window.innerHeight * (1/4));

            text('135°', window.innerWidth * (3/4) - 80, window.innerHeight * (3/4) - 32);
            image(hundredthirtyfiveDeg, window.innerWidth * (3/4) - 96, window.innerHeight * (3/4));


            textSize(16);
            text('0° and 90° can only be\nmeasured with the + basis.', window.innerWidth * (1/4) - 128, window.innerHeight * (1/2) - 48);
            image(plusMeasure, window.innerWidth * (1/4) - 96, window.innerHeight * (1/2));

            text('45° and 135° can only be\nmeasured with the x basis.', window.innerWidth * (3/4) - 128, window.innerHeight * (1/2) - 48);
            image(xMeasure, window.innerWidth * (3/4) - 96, window.innerHeight * (1/2));


            break;

        case 7:
            text('On each basis there are two\npossible bit values. 1 and 0.', window.innerWidth * (1/3) + 64, window.innerHeight * 1/8);

            text('0° = 1 bit', window.innerWidth * (1/4) - 96, window.innerHeight * (1/4)- 32);
            image(zeroDeg, window.innerWidth * (1/4) - 96, window.innerHeight * (1/4));

            text('90° = 0 bit', window.innerWidth * (1/4) - 104, window.innerHeight * (3/4)- 32);
            image(ninetyDeg, window.innerWidth * (1/4) - 96, window.innerHeight * (3/4));


            text('45° = 0 bit', window.innerWidth * (3/4) - 104, window.innerHeight * (1/4)- 32);
            image(fortyfiveDeg, window.innerWidth * (3/4) - 96, window.innerHeight * (1/4));

            text('135° = 1 bit', window.innerWidth * (3/4) - 124, window.innerHeight * (3/4) - 32);
            image(hundredthirtyfiveDeg, window.innerWidth * (3/4) - 96, window.innerHeight * (3/4));


            textSize(16);
            text('0° and 90° can only be\nmeasured with the + basis.', window.innerWidth * (1/4) - 128, window.innerHeight * (1/2) - 48);
            image(plusMeasure, window.innerWidth * (1/4) - 96, window.innerHeight * (1/2));

            text('45° and 135° can only be\nmeasured with the x basis.', window.innerWidth * (3/4) - 128, window.innerHeight * (1/2) - 48);
            image(xMeasure, window.innerWidth * (3/4) - 96, window.innerHeight * (1/2));

            break;

        case 8:
            text('\t\t\tAlice sends Bob photons for them to measure.\nBob randomly selects a basis to measure each photon.',  window.innerWidth * (1/3) - 64, window.innerHeight * 1/8);
            text('Bob randomly selects either the + or x basis\n\t\t\t\t\t\t\t\tto measure each photon.',  window.innerWidth * (1/3) - 32, window.innerHeight * 3/4);

            image(hundredthirtyfiveDeg, x, window.innerHeight * (1/3), 96, 96);

            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(xMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);

            break;

        case 9:
            text('If Bob guesses correctly, they can measure the bit value of the photon.\nOtherwise they measure the bit value as "Undefined" and discounts it.',  window.innerWidth * (1/3) - 160, window.innerHeight * 1/8);

            text('Bob has a 50% chance of guessing the basis and measuring the bit correctly.',  window.innerWidth * (1/3) - 192, window.innerHeight * 3/4);

            image(hundredthirtyfiveDeg, x, window.innerHeight * (1/3), 96, 96);

            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            fill(0, 255, 0)
            text('Correct basis\nBit value = 1',  window.innerWidth * (2/3), window.innerHeight * (1/3) + 128);
            fill(255, 255, 255);


            image(xMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);

            break;

        case 10:
            text('If Bob guesses correctly, he can measure the bit value of the photon.\nOtherwise he measures the bit value as "Undefined" and discounts it.',  window.innerWidth * (1/3) - 160, window.innerHeight * 1/8);
            text('Bob has a 50% chance of guessing the basis and measuring the bit correctly.',  window.innerWidth * (1/3) - 192, window.innerHeight * 3/4);

            image(hundredthirtyfiveDeg, x, window.innerHeight * (1/3), 96, 96);

            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);
            fill(255, 0, 0)
            text('\tIncorrect basis\nUnknown bit value',  window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) + 128);
            fill(255, 255, 255);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);

            break;

        case 11:
            textAlign(CENTER);
            text('The purpose of this protocol is to ensure there are no eavesdroppers.',  window.innerWidth * (1/2), window.innerHeight * 1/8);
            text('To do this, the protocol takes advantage of the "No-Cloning" Theorem.',  window.innerWidth * (1/2), window.innerHeight * 3/4);

            image(ninetyDeg, x, window.innerHeight * (1/3), 96, 96);

            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);

            break;

        case 12:
            textAlign(CENTER);
            text('Enter the eavesdropper: Eve.',  window.innerWidth * (1/2), window.innerHeight * 3/4);
            text('Eve will intercept the photons and measure on their own basis',  window.innerWidth * (1/2), window.innerHeight * 7/8);

            image(ninetyDeg, x, window.innerHeight * (1/3), 96, 96);

            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);

            image(eve, window.innerWidth * (1/2) - 32, window.innerHeight * (1/4) - 112, 64, 128);
            text('Eve', window.innerWidth * (1/2) - 12, window.innerHeight * (1/4) - 120);
    
        
            break;
            
        case 13:
            textAlign(CENTER);
            text('Eve measures the photons the same way Bob does.\nBy guessing the correct basis with a 50% probability.',  window.innerWidth * (1/2), window.innerHeight * 3/4);
            text('But how can Alice and Bob detect if Eve is eavesdropping?',  window.innerWidth * (1/2), window.innerHeight * 7/8);

            if((x < window.innerWidth * (1/3) - 48) || (x < window.innerWidth * (1/2) - 48))
                image(ninetyDeg, x, window.innerHeight * (1/3), 96, 96);
            else if((x >= window.innerWidth * (1/2) - 48) || (x > window.innerWidth * (2/3)))
                image(fortyfiveDeg, x, window.innerHeight * (1/3), 96, 96);

            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);


            image(eve, window.innerWidth * (1/2) - 32, window.innerHeight * (1/4) - 112, 64, 128);
            text('Eve', window.innerWidth * (1/2) - 12, window.innerHeight * (1/4) - 120);

            image(xMeasure, window.innerWidth * (1/2) - 48, window.innerHeight * (1/3), 96, 96);
            text('Eve Basis', window.innerWidth * (1/2) - 38, window.innerHeight * (1/3) - 16);
        
            break;
        
        case 14:
            textAlign(CENTER);
            text('By No-Cloning, Eve cannot measure a photon in the incorrect basis and "clone" the photon\nwhen Eve retransmits it to Bob. Essentially, if Eve guesses wrong, there is no way for\nthem to know what the polarization (and therefore bit value) of the photon actually is.',  window.innerWidth * (1/2), window.innerHeight * 5/8);
            text('\nNotice Eve changes the bit after measuring incorrectly.',  window.innerWidth * (1/2), window.innerHeight * 6/8);

            if((x < window.innerWidth * (1/3) - 48) || (x < window.innerWidth * (1/2) - 48))
                image(ninetyDeg, x, window.innerHeight * (1/3), 96, 96);
            else if((x >= window.innerWidth * (1/2) - 48) || (x > window.innerWidth * (2/3)))
                image(fortyfiveDeg, x, window.innerHeight * (1/3), 96, 96);

            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);


            image(eve, window.innerWidth * (1/2) - 32, window.innerHeight * (1/4) - 112, 64, 128);
            text('Eve', window.innerWidth * (1/2) - 12, window.innerHeight * (1/4) - 120);

            image(xMeasure, window.innerWidth * (1/2) - 48, window.innerHeight * (1/3), 96, 96);
            text('Eve Basis', window.innerWidth * (1/2) - 38, window.innerHeight * (1/3) - 16);
    
            break;

        case 15:
            textAlign(CENTER);
            text('Therefore, Bob now has only a\t25%\t(50% * 50%)\tchance of measuring the photon correctly.',  window.innerWidth * (1/2), window.innerHeight * 5/8);
            text('Alice and Bob will be able to observe about 75% of Bob\'s bits are incorrect.\nAs opposed to 50% between just Alice and Bob',  window.innerWidth * (1/2), window.innerHeight * 6/8);

            if((x < window.innerWidth * (1/3) - 48) || (x < window.innerWidth * (1/2) - 48))
                image(ninetyDeg, x, window.innerHeight * (1/3), 96, 96);
            else if((x >= window.innerWidth * (1/2) - 48) || (x > window.innerWidth * (2/3)))
                image(fortyfiveDeg, x, window.innerHeight * (1/3), 96, 96);


            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);


            image(eve, window.innerWidth * (1/2) - 32, window.innerHeight * (1/4) - 112, 64, 128);
            text('Eve', window.innerWidth * (1/2) - 12, window.innerHeight * (1/4) - 120);

            image(xMeasure, window.innerWidth * (1/2) - 48, window.innerHeight * (1/3), 96, 96);
            text('Eve Basis', window.innerWidth * (1/2) - 38, window.innerHeight * (1/3) - 16);
    
            break;
        
        case 16:
            textAlign(CENTER);
            text('Alice and Bob detect the presense of Eve by observing the bit error rate.',  window.innerWidth * (1/2), window.innerHeight * 5/8);
            text('If the error rate becomes too large (more than 65% for this simulation)\nAlice and Bob terminate communication.',  window.innerWidth * (1/2), window.innerHeight * 6/8);

            if((x < window.innerWidth * (1/3) - 48) || (x < window.innerWidth * (1/2) - 48))
                image(ninetyDeg, x, window.innerHeight * (1/3), 96, 96);
            else if((x >= window.innerWidth * (1/2) - 48) || (x > window.innerWidth * (2/3)))
                image(fortyfiveDeg, x, window.innerHeight * (1/3), 96, 96);


            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);


            image(eve, window.innerWidth * (1/2) - 32, window.innerHeight * (1/4) - 112, 64, 128);
            text('Eve', window.innerWidth * (1/2) - 12, window.innerHeight * (1/4) - 120);

            image(xMeasure, window.innerWidth * (1/2) - 48, window.innerHeight * (1/3), 96, 96);
            text('Eve Basis', window.innerWidth * (1/2) - 38, window.innerHeight * (1/3) - 16);
    
            break;
        case 17:
            textAlign(CENTER);
            text('Alice and Bob create secure keys using probability!',  window.innerWidth * (1/2), window.innerHeight * 5/8);
            text('Eve will be detected more often than not at a key size of 8.\nAs key size increases, the probabilty Eve remains undetected decreases.\n\nTypically, key sizes will be 512 or larger for modern encryption algorithms.',  window.innerWidth * (1/2), window.innerHeight * 6/8);

            if((x < window.innerWidth * (1/3) - 48) || (x < window.innerWidth * (1/2) - 48))
                image(ninetyDeg, x, window.innerHeight * (1/3), 96, 96);
            else if((x >= window.innerWidth * (1/2) - 48) || (x > window.innerWidth * (2/3)))
                image(fortyfiveDeg, x, window.innerHeight * (1/3), 96, 96);


            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);


            image(eve, window.innerWidth * (1/2) - 32, window.innerHeight * (1/4) - 112, 64, 128);
            text('Eve', window.innerWidth * (1/2) - 12, window.innerHeight * (1/4) - 120);

            image(xMeasure, window.innerWidth * (1/2) - 48, window.innerHeight * (1/3), 96, 96);
            text('Eve Basis', window.innerWidth * (1/2) - 38, window.innerHeight * (1/3) - 16);
    
            break;

        case 18:
            textAlign(CENTER);
            text('For more information please view the explanation below,\nor the paper this project is based on by clicking the "Research" button.',  window.innerWidth * (1/2), window.innerHeight * (5/8));
            if(x % 64 >= 0 && x % 64 <= 32) {
                fill(255, 0, 0);
                rect(window.innerWidth * (7/8) - 64, window.innerHeight * (1/6) - 12, 85, 28);
                fill(255, 255, 255);
            }
            textAlign(LEFT);
            textSize(16);

            image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
            text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);
        
            image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
            text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

            image(plusMeasure, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
            text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);


            image(eve, window.innerWidth * (1/2) - 32, window.innerHeight * (1/4) - 112, 64, 128);
            text('Eve', window.innerWidth * (1/2) - 12, window.innerHeight * (1/4) - 120);

            image(xMeasure, window.innerWidth * (1/2) - 48, window.innerHeight * (1/3), 96, 96);
            text('Eve Basis', window.innerWidth * (1/2) - 38, window.innerHeight * (1/3) - 16);

            break;

    }

    if((x < window.innerWidth * (1/3)) || (x > window.innerWidth * (2/3))) {
        x =  window.innerWidth * (1/3);
        inc++;
    }

    if(inc > 18) {
        startExpl = false;
        startSim = false;
    }

}

// All of the sim drawing logic is stored in here
function drawSim() {
    background(100, 100, 200);
    
    textSize(32);

    textSize(16);

    photonDesc = drawPhotonBasisText(ap, ep, ab, ae);

    image(photon, x, window.innerHeight * (1/3), 96, 96);

    text(photonDesc, x, window.innerHeight * (1/3) + 128);

    
    image(bobBasis, window.innerWidth * (7/12) - 48, window.innerHeight * (1/3), 96, 96);
    text('Bob Basis', window.innerWidth * (7/12) - 38, window.innerHeight * (1/3) - 16);
    if(eveIntercept) {
        image(eveBasis, window.innerWidth * (1/2) - 48, window.innerHeight * (1/3), 96, 96);
        text('Eve Basis', window.innerWidth * (1/2) - 38, window.innerHeight * (1/3) - 16);
    }

    x += xSpeed;

    if((x < window.innerWidth * (1/3)) || (x > window.innerWidth * (2/3))) {
        x =  window.innerWidth * (1/3);
        inc++;
    }

    drawOTP(inc);

    drawEveDetect(drawErrorRate(inc));

    drawABE(eveIntercept);
    drawCredits();

}

// Takes the user back to the home screen
function home() {
    startSim = false;
    startExpl = false;
}

// Function to prompt the user for settings
function openSettings() {
    settings = confirm("Would you like to enter settings?.\n\nOk = Yes\nCancel = No");
    if(settings) {
        keySize = parseInt(prompt("Please enter Key size.\n(128 Default)"));
        xSpeed = parseInt(prompt("Please enter photon speed.\n(1 Default)"));
        eveIntercept = confirm("Please select if Eve is present.\n\nOk = Yes\nCancel = No");

    }
    rerunSim();
    inc = 0;
    x = window.innerWidth * (1/3);

}

// Opens up paper this sim is based on when "More Info" button is clicked
function openResearch() {
    window.open("Quantum Cryptography.pdf");
}

// Function to start the animated explanation
function openExpl() {
    startSim = false;
    startExpl = startExpl == true ? false : true;
    inc = 0;
    x = innerWidth * (1/3);
}

// Function to start and stop animation
function pauseAnim() {
    startExpl = false;
    startSim = startSim == true ? false : true;
    rerunSim();
    inc = 0;
    x = window.innerWidth * (1/3);
}

// Function to draw the one time pad dynamically as animation plays.
function drawOTP(inc) {
    // need to add another pad to alice.
    // in comparefunction assign a new member variable to otp before otp is assigned to tempotp
    let shiftDown = 0;
    text('Alice OTP:', window.innerWidth * (1/3) - 96, window.innerHeight * (1/3) + 208);

    for(let i = 0; i < inc; i++) {
        text(sim.getAlice().getPOTP()[i].getBit(), window.innerWidth * (1/3) - 24 + 16 * (i % 32 + 1), window.innerHeight * (1/3) + 208 + 16 * shiftDown);
        if(i % 32 == 31) shiftDown++;
    }
    if(eveIntercept) {
        text('Eve OTP:', window.innerWidth * (1/3) - 96, window.innerHeight * (1/3) + 240 + 16 * shiftDown);
        for(let i = 0; i < inc; i++) {
            text(sim.getEve().getOTP()[i].getBit(), window.innerWidth * (1/3) - 24 + 16 * (i % 32 + 1), window.innerHeight * (1/3) + 240 + 16 * shiftDown);
            if(i % 32 == 31) shiftDown++;
        }
    }

    text('Bob OTP:', window.innerWidth * (1/3) - 96, window.innerHeight * (1/3) + 272 + 16 * shiftDown);
    for(let i = 0; i < inc; i++) {
        text(sim.getBob().getOTP()[i].getBit(), window.innerWidth * (1/3) - 24 + 16 * (i % 32 + 1), window.innerHeight * (1/3) + 272 + 16 * shiftDown);
        if(i % 32 == 31) shiftDown++;
    }
}

// Function to draw Alice, Bob, Eve static sprites.
function drawABE(eveIntercept) {
    image(alice, window.innerWidth * (1/3) - 144, window.innerHeight * (1/3) - 32, 128, 160);
    text('Alice', window.innerWidth * (1/3) - 104, window.innerHeight * (1/3) - 40);

    image(bob, window.innerWidth * (2/3) - 16, window.innerHeight * (1/3) - 40, 128, 128);
    text('Bob',  window.innerWidth * (2/3) + 28, window.innerHeight * (1/3) - 40);

    if(eveIntercept) {
        image(eve, window.innerWidth * (1/2) - 32, window.innerHeight * (1/4) - 112, 64, 128);
        text('Eve', window.innerWidth * (1/2) - 12, window.innerHeight * (1/4) - 120);
    }


}

// Function to dynamically draw the basis for Eve and Bob to measure the photon.
function drawPhotonBasisText(ap, ep, ab, ae) {
    let photonDesc;

    if(ab[inc] == "+") { bobBasis = plusMeasure; }
    else if(ab[inc] == "x") { bobBasis = xMeasure; }

    if(ae[inc] == "+") { eveBasis = plusMeasure; }
    else if(ae[inc] == "x") { eveBasis = xMeasure; }

    if(eveIntercept) {
        if((x < window.innerWidth * (1/3) - 48) || (x < window.innerWidth * (1/2) - 48)) {
            if(ap[inc] == "zeroDeg") { photon = zeroDeg; photonDesc = "Basis: +\nPolar: 0°\nBit: 1"; }
            else if(ap[inc] == "fortyfiveDeg") { photon = fortyfiveDeg; photonDesc = "Basis: x\nPolar: 45°\nBit: 0"; }
            else if(ap[inc] == "ninetyDeg") { photon = ninetyDeg; photonDesc = "Basis: +\nPolar: 90°\nBit: 0"; }
            else if(ap[inc] == "hundredthirtyfiveDeg") { photon = hundredthirtyfiveDeg; photonDesc = "Basis: x\nPolar: 135°\nBit: 1"; }
        }
        if((x >= window.innerWidth * (1/2) - 48) || (x > window.innerWidth * (2/3))) {
            if(ep[inc] == "zeroDeg") { photon = zeroDeg; photonDesc = "Basis: +\nPolar: 0°\nBit: 1"; }
            else if(ep[inc] == "fortyfiveDeg") { photon = fortyfiveDeg; photonDesc = "Basis: x\nPolar: 45°\nBit: 0"; }
            else if(ep[inc] == "ninetyDeg") { photon = ninetyDeg; photonDesc = "Basis: +\nPolar: 90°\nBit: 0"; }
            else if(ep[inc] == "hundredthirtyfiveDeg") { photon = hundredthirtyfiveDeg; photonDesc = "Basis: x\nPolar: 135°\nBit: 1"; }
        }
    } else {
        if((x < window.innerWidth * (1/3) - 48) || (x < window.innerWidth * (2/3) - 48)) {
            if(ap[inc] == "zeroDeg") { photon = zeroDeg; photonDesc = "Basis: +\nPolar: 0°\nBit: 1"; }
            else if(ap[inc] == "fortyfiveDeg") { photon = fortyfiveDeg; photonDesc = "Basis: x\nPolar: 45°\nBit: 0"; }
            else if(ap[inc] == "ninetyDeg") { photon = ninetyDeg; photonDesc = "Basis: +\nPolar: 90°\nBit: 0"; }
            else if(ap[inc] == "hundredthirtyfiveDeg") { photon = hundredthirtyfiveDeg; photonDesc = "Basis: x\nPolar: 135°\nBit: 1"; }
        }
    }
    return photonDesc;
}

// Function to dynamically draw error rate during animation.
function drawErrorRate(inc) {
    let errorAmount = 0;
    let errorRate = 0;
    for(let i = 0; i < inc; i++) {
        if(sim.getAlice().getOTP()[i].getBit() != sim.getAlice().getBOTP()[i]) {
            errorAmount++;
        }
    }

    errorRate = Math.ceil(errorAmount / inc * 100);

    text('Error Rate: ' + errorRate + '%', window.innerWidth * (1/8), window.innerHeight * (1/8));

    return errorRate;
}

// Function to dynamically draw whether Eve is detected during animation.
// If errrorRate > 70% then Eve is detected.
function drawEveDetect(errorRate) {
    if(errorRate > 20) { text('Eve Detect: True', window.innerWidth * (1/8), window.innerHeight * (1/6)); }
    else { text('Eve Detect: False', window.innerWidth * (1/8), window.innerHeight * (1/6)); }
}

// Function to draw the names of those responsible for this site.
function drawCredits() {
    textSize(16);
    text('Made by Garrett Stallsmith,\nin conjunction with John Sipahioglu\n\nResearch by Dr. Younghoun Chae\n\nKent State COF-CS 2023', window.innerWidth * (3/4), window.innerHeight * (3/4));
}

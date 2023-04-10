let keySize = 128;
let xSpeed = 5;
let eveIntercept = true;
let reload = false;

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
    if(!reload) { reload = true; }

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


    image(photon, window.innerWidth * (1/3), window.innerHeight * (1/3), 32, 32);
    
}

// P5 function that drives the entire animation.
function draw() {
    background(100, 100, 200);

    if(!startSim) {
        drawStart();
            
    }


    if(startSim) {
        if(inc < keySize) {

            drawSim();
        }
        if(inc >= keySize && reload == true) {
            location.reload()
        } else if (inc >= keySize) {
            rerunSim();
        }
    }
}



function drawStart() {
    
    background(100, 100, 200);
    
    textSize(64);
    text('BB84 Quantum Key Distribution', window.innerWidth * (1/5), window.innerHeight * 1/8);

    startButton = createButton('Start')
    startButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6) + 32);
    startButton.mousePressed(pauseAnim);


    settingsButton = createButton('Settings');
    settingsButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6) - 32);
    settingsButton.mousePressed(openSettings);

    infoButton = createButton('Research');
    infoButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6));
    infoButton.mousePressed(openResearch);

}

function drawSim() {
    background(100, 100, 200);
    
    settingsButton = createButton('Settings');
    settingsButton.position(window.innerWidth, window.innerHeight * (1/8));
    settingsButton.mousePressed(openSettings);

    infoButton = createButton('Research');
    infoButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6));
    infoButton.mousePressed(openResearch);

    stopButton = createButton('Stop');
    stopButton.position(window.innerWidth * (7/8) - 48, window.innerHeight * (1/6) + 32);
    stopButton.mousePressed(pauseAnim);

    textSize(32);

    text('More Info Below!', window.innerWidth * (1/2) - 128, window.innerHeight * 7/8);
    text('\nV', window.innerWidth * (1/2) - 16, window.innerHeight * 7/8 + 3 * Math.cos(3.14 / 32 * x));

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

let settings;
function openSettings() {
    settings = confirm("Would you like to enter settings?.\n\nOk = Yes\nCancel = No");
    if(settings) {
        keySize = parseInt(prompt("Please enter Key size.\n(128 Default)"));
        xSpeed = parseInt(prompt("Please enter photon speed.\n(1 Default)"));
        eveIntercept = confirm("Please select if Eve is present.\n\nOk = Yes\nCancel = No");
        reload = confirm("Reload page on animation end?\n\nOk = Yes\nCancel = No");

    }
    rerunSim();
    inc = 0;
    x = 0;

}

// Opens up paper this sim is based on when "More Info" button is clicked
function openResearch() {
    window.open("Quantum Cryptography.pdf");
}

let startSim = false;
function pauseAnim() {
    startSim = startSim == true ? false : true;
    rerunSim();
    inc = 0;
    x = 0;
}

// Function to draw the one time pad dynamically as animation plays.
function drawOTP(inc) {
    let shiftDown = 0;
    text('Alice OTP:', window.innerWidth * (1/3) - 96, window.innerHeight * (1/3) + 208);

    for(let i = 0; i < inc; i++) {
        text(sim.getAlice().getOTP()[i].getBit(), window.innerWidth * (1/3) - 24 + 16 * (i % 32 + 1), window.innerHeight * (1/3) + 208 + 16 * shiftDown);
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
            if(ap[inc] == "zeroDeg") { photon = zeroDeg; photonDesc = "Bit: 1\nBasis: +\nPolarization: 0°"; }
            else if(ap[inc] == "fortyfiveDeg") { photon = fortyfiveDeg; photonDesc = "Bit: 0\nBasis: x\nPolarization: 45°"; }
            else if(ap[inc] == "ninetyDeg") { photon = ninetyDeg; photonDesc = "Bit: 0\nBasis: +\nPolarization: 90°"; }
            else if(ap[inc] == "hundredthirtyfiveDeg") { photon = hundredthirtyfiveDeg; photonDesc = "Bit: 1\nBasis: x\nPolarization: 135°"; }
        }
        if((x >= window.innerWidth * (1/2) - 48) || (x > window.innerWidth * (2/3))) {
            if(ep[inc] == "zeroDeg") { photon = zeroDeg; photonDesc = "Bit: 1\nBasis: +\nPolarization: 0°"; }
            else if(ep[inc] == "fortyfiveDeg") { photon = fortyfiveDeg; photonDesc = "Bit: 0\nBasis: x\nPolarization: 45°"; }
            else if(ep[inc] == "ninetyDeg") { photon = ninetyDeg; photonDesc = "Bit: 0\nBasis: +\nPolarization: 90°"; }
            else if(ep[inc] == "hundredthirtyfiveDeg") { photon = hundredthirtyfiveDeg; photonDesc = "Bit: 1\nBasis: x\nPolarization: 135°"; }
        }
    } else {
        if((x < window.innerWidth * (1/3) - 48) || (x < window.innerWidth * (2/3) - 48)) {
            if(ap[inc] == "zeroDeg") { photon = zeroDeg; photonDesc = "Bit: 1\nBasis: +\nPolarization: 0°"; }
            else if(ap[inc] == "fortyfiveDeg") { photon = fortyfiveDeg; photonDesc = "Bit: 0\nBasis: x\nPolarization: 45°"; }
            else if(ap[inc] == "ninetyDeg") { photon = ninetyDeg; photonDesc = "Bit: 0\nBasis: +\nPolarization: 90°"; }
            else if(ap[inc] == "hundredthirtyfiveDeg") { photon = hundredthirtyfiveDeg; photonDesc = "Bit: 1\nBasis: x\nPolarization: 135°"; }
        }
    }
    return photonDesc;
}

// Function to dynamically draw error rate during animation.
function drawErrorRate(inc) {
    let correctPhoton = 0;
    let errorRate = 0;
    for(let i = 0; i < inc; i++) {
        if(sim.getBob().getOTP()[i].getBit() != 'U') {
            if((sim.getAlice().getOTP()[i].getBit() == sim.getBob().getOTP()[i].getBit()
            && sim.getAlice().getOTP()[i].getBasis() == sim.getBob().getOTP()[i].getBasis()
            && sim.getAlice().getOTP()[i].getPolar() == sim.getBob().getOTP()[i].getPolar()))
            { correctPhoton++; }
        }
    }

    errorRate = Math.ceil((1 - correctPhoton / inc) * 100);

    text('Error Rate: ' + errorRate + '%', window.innerWidth * (1/8), window.innerHeight * (1/8));

    return errorRate;
}

// Function to dynamically draw whether Eve is detected during animation.
// If errrorRate > 70% then Eve is detected.
function drawEveDetect(errorRate) {
    if(errorRate > 70) { text('Eve Detect: True', window.innerWidth * (1/8), window.innerHeight * (1/6)); }
    else { text('Eve Detect: False', window.innerWidth * (1/8), window.innerHeight * (1/6)); }
}

// Function to draw the names of those responsible for this site.
function drawCredits() {
    text('Made by Garrett Stallsmith,\nin conjunction with John Sipahioglu\n\nResearch by Dr. Younghoun Chae\n\nKent State COF-CS 2023', window.innerWidth * (3/4), window.innerHeight * (3/4));
}

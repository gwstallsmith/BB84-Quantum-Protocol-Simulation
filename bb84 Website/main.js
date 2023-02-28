// This is the AnimManager
// It employs the Singleton design pattern.
// It will be used throughout the Alice, Bob, and Eve classes to keep track of what animations need to be executed.
// Only a single instance of this class will exist. Alice, Bob and Eve will share this instance.
class AnimManager {
    constructor() {
        if(AnimManager.instance instanceof AnimManager) {
            return AnimManager.instance;
        }

        this.AnimManagerObject = {};
        
        this.alicePhotons_ = [];
        this.evePhotons_ = [];
        this.bobBasis_ = [];
        this.eveBasis_ = [];

        Object.freeze(this.AnimManagerObject);
        Object.freeze(this);
        AnimManager.instance = this;
    }

    // Getters, nothing too special
    getAlicePhotons() { return this.alicePhotons_; }
    getEvePhotons() { return this.evePhotons_; }
    getBobBasis() { return this.bobBasis_; }
    getEveBasis() { return this.bobBasis_; }

    // We are keeping track of the animations with a quasi stack.
    // This method allows us store all of the types of photons Alice will send in order.
    pushAlicePhoton(photon) {
        if(photon.getBasis() == "+") {
            if(photon.getPolar() == "0") {
                this.alicePhotons_.push("zeroDeg");

            } else if(photon.getPolar() == "90") {
                this.alicePhotons_.push("ninetyDeg");
            }

        } else if(photon.getBasis() == "x") {
            if(photon.getPolar() == "45") {
                this.alicePhotons_.push("fortyfiveDeg");

            } else if(photon.getPolar() == "135") {
                this.alicePhotons_.push("hundredthirtyfiveDeg");
            }

        }
    }

    // This method allows us to store all of the types of photons Eve will send in order.
    // Eve's push also pushes the basis of the photon Eve sends to Bob.
    pushEvePhoton(photon) {
        if(photon.getBasis() == "+") {
            if(photon.getPolar() == "0") { this.evePhotons_.push("zeroDeg"); }
            else if(photon.getPolar() == "90") { this.evePhotons_.push("ninetyDeg"); }

        } else if(photon.getBasis() == "x") {
            if(photon.getPolar() == "45") { this.evePhotons_.push("fortyfiveDeg"); }
            else if(photon.getPolar() == "135") { this.evePhotons_.push("hundredthirtyfiveDeg"); }

        }
        this.pushEveBasis(photon.getBasis());
    }

    // This method allows us to store every basis Bob uses in order.
    pushBobBasis(basis) {
        if(basis == "+") { this.bobBasis_.push("+"); }
        else if (basis == "x") { this.bobBasis_.push("x"); }
    }

    // This method allows us to store every basis Bob uses in order.
    // Used in pushEvePhoton()
    pushEveBasis(basis) {
        if(basis == "+") { this.eveBasis_.push("+"); }
        else if (basis == "x") { this.eveBasis_.push("x"); }
    }


    // Utility print functions for debugging.
    printAlicePhotons() {
        console.log("Photons sent by Alice");
        for(let i = 0; i < this.alicePhotons_.length; ++i) { console.log(this.alicePhotons_[i]); }
    }

    printEvePhotons() {
        console.log("Photons sent by Eve");
        for(let i = 0; i < this.evePhotons_.length; ++i) { console.log(this.evePhotons_[i]); }
    }

    printBobBasis() {
        console.log("Bob");
        for(let i = 0; i < this.bobBasis_.length; ++i) { console.log(this.bobBasis_[i]); }
    }

    printEveBasis() {
        console.log("Eve");
        for(let i = 0; i < this.eveBasis_.length; ++i) { console.log(this.eveBasis_[i]); }
    }


};

// Photons are the datatype that will be transfered between Alice, Bob, and Eve.
// They contain a bit value (0, 1), a basis value (+, x), and a polarization in degrees (0, 45, 90, 135)
// There are four variations of photons:
// (1, +, 0)
// (0, x, 45)
// (0, +, 90)
// (1, x, 135)
// 
// Bit, basis, and polarization are tied together.
// Each basis has two polarizations, and each polarization has an assigned bit value.
class Photon {
    constructor(bit, basis, polar){
        this.bit_ = bit;
        this.basis_ = basis;
        this.polar_ = polar;
    }

    // Getters
    getBit() { return this.bit_; }
    getBasis() { return this.basis_; }
    getPolar() { return this.polar_; }

    // Setters
    setBit(newBit) { this.bit_ = newBit; }
    setBasis(newBasis) { this.basis_ = newBasis; }
    setPolar(newPolar) { this.polar_ = newPolar; }
};

// In BB84 Alice is the original sender.
// It is Alice's job to send a one time pad across the medium.
// After the exchange, Alice will compare one time pads with Bob.
class Alice {
    constructor() {
        this.bit_ = "1";
        this.basis_ = "+";
        this.polar_ = "0";
        this.otp_ = [];
        this.botp_ = [];

        this.am_ = new AnimManager();
    }

    // This generates random values to be stored as photons
    // Allows for easy randomization of Alice's bit_, basis_, and polar_ values.
    // 1/4 chance for any given photon
    randBitBasisPolar() {
        if(Math.floor(Math.random() * 2) % 2 == 0){
            this.basis_ = "+";
            if(Math.floor(Math.random() * 2) % 2 == 0) {
                this.polar_ = "0";
                this.bit_ = "1";
            } else {
                this.polar_ = "90";
                this.bit_ = "0";
            }
        } else {
            this.basis_ = "x";
            if(Math.floor(Math.random() * 2) % 2 == 0) {
                this.polar_ = "45";
                this.bit_ = "0";
            } else {
                this.polar_ = "135";
                this.bit_ = "1";
            }
        }
    }

    // This generates padSize amount of randomized photons for the one time pad.
    generateOTP(padSize) {
        for(let i = 0; i < padSize; i++) {
            this.randBitBasisPolar()
            this.am_.pushAlicePhoton(new Photon(this.bit_, this.basis_, this.polar_));
            this.otp_.push(new Photon(this.bit_, this.basis_, this.polar_));
        }
        return this.otp_;
    }

    // This method is used to compare the bit values Alice sent and bit values Bob received.
    compareOTP(inOTP) {
        for(let i = 0; i < inOTP.length; i++) {
            if((this.otp_[i].getBasis() == inOTP[i].getBasis()) && (this.otp_[i].getBit() == inOTP[i].getBit()) && (this.otp_[i].getPolar() == inOTP[i].getPolar())) {
                this.botp_.push(inOTP[i].getBit());
            }
        }
        return this.botp_;
    }

    // Utility print functions for debugging.
    printOTP() { for(let i = 0; i < this.otp_.length; i++) { console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar()); } }
    printBOTP() { for(let i = 0; i < this.botp_.length; i++) { console.log(i + ".) " + this.botp_[i]); } }
};

// In BB84 Bob is the receiver.
// It is Bob's job to measure the photons that are sent to him.
class Bob {
    constructor() {
        this.bit_ = "1";
        this.basis_ = "+";
        this.polar_ = "0";
        this.otp_ = [];

        this.am_ = new AnimManager();
    }

    // This generates random values to be stored as photons
    // Allows for easy randomization of Bob's bit_, basis_, and polar_ values.
    // 1/4 chance for any given Photon
    randBitBasisPolar() {
        if(Math.floor(Math.random() * 2) % 2 == 0){
            this.basis_ = "+";
            if(Math.floor(Math.random() * 2) % 2 == 0) {
                this.polar_ = "0";
                this.bit_ = "1";
            } else {
                this.polar_ = "90";
                this.bit_ = "0";
            }
        } else {
            this.basis_ = "x";
            if(Math.floor(Math.random() * 2) % 2 == 0) {
                this.polar_ = "45";
                this.bit_ = "0";
            } else {
                this.polar_ = "135";
                this.bit_ = "1";
            }
        }
    }

    // This method allows Bob to guess a photon value and check to see if received photon is equivalent.
    // If Bob guesses the correct basis but incorrect polarization, he will know the correct bit value.
    // If Bob does not guess the correct basis he will not be certain what the correct bit value is.
    measureOTP(inOTP) {
        for(let i = 0; i < inOTP.length; i++) {

            this.randBitBasisPolar();
            this.am_.pushBobBasis(this.basis_);

            if(inOTP[i].getBasis() == this.basis_) {

                if(inOTP[i].getPolar() == "0") this.otp_.push(new Photon("1", "+", "0"));
                else if(inOTP[i].getPolar() == "45") this.otp_.push(new Photon("0", "x", "45"));
                else if(inOTP[i].getPolar() == "90") this.otp_.push(new Photon("0", "+", "90"));
                else if(inOTP[i].getPolar() == "135") this.otp_.push(new Photon("1", "x", "135"));

            } else {
                this.otp_.push(new Photon("U", this.basis_, this.polar_));
            }
        }
        return this.otp_;
    }

    // Utility print functions for debugging.
    printOTP() { for(let i = 0; i < this.otp_.length; i++) { console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar()); } }
    printBOTP() { for(let i = 0; i < this.botp_.length; i++) { console.log(i + ".) " + this.botp_[i]); } }
};

// In BB84 Eve is the intercepter (eavesdropper -> Eve).
// Eve will intercept a photon and tranmit a new photon to Bob.
class Eve {
    constructor() {
        this.bit_ = "1";
        this.basis_ = "+";
        this.polar_ = "0";
        this.otp_ = [];

        this.am_ = new AnimManager();
    }

    // This generates random values to be stored as photons
    // Allows for easy randomization of Eve's bit_, basis_, and polar_ values.
    // 1/4 chance for any given Photon
    randBitBasisPolar() {
        if(Math.floor(Math.random() * 2) % 2 == 0){
            this.basis_ = "+";
            if(Math.floor(Math.random() * 2) % 2 == 0) {
                this.polar_ = "0";
                this.bit_ = "1";
            } else {
                this.polar_ = "90";
                this.bit_ = "0";
            }
        } else {
            this.basis_ = "x";
            if(Math.floor(Math.random() * 2) % 2 == 0) {
                this.polar_ = "45";
                this.bit_ = "0";
            } else {
                this.polar_ = "135";
                this.bit_ = "1";
            }
        }
    }

    // This method allows Eve to guess a photon value and check to see if received photon is equivalent.
    // Eve will intercept Alice's photons with the same chance as Bob to interpret them correctly (50%) and send to Bob.
    // Due to the no-cloning theorem, if Eve guesses a basis incorrectly there is no way for Eve to pass the same photon along.
    // Therefore Eve must send a random photon in the opposite basis.
    // Eve does not know if it is the same photon she received.
    measureOTP(inOTP) {
        for(let i = 0; i < inOTP.length; i++) {
            this.randBitBasisPolar();

            if(inOTP[i].getBasis() == this.basis_) {
                if(inOTP[i].getPolar() == "0") {
                    this.otp_.push(new Photon("1", "+", "0"));
                    this.am_.pushEvePhoton(new Photon("1", "+", "0"));
                
                } else if(inOTP[i].getPolar() == "45"){
                    this.otp_.push(new Photon("0", "x", "45"));
                    this.am_.pushEvePhoton(new Photon("0", "x", "45"));

                } else if(inOTP[i].getPolar() == "90"){
                    this.otp_.push(new Photon("0", "+", "90"));
                    this.am_.pushEvePhoton(new Photon("0", "+", "90"));

                } else if(inOTP[i].getPolar() == "135") {
                    this.otp_.push(new Photon("1", "x", "135"));
                    this.am_.pushEvePhoton(new Photon("1", "x", "135"));
                }

            } else {
                this.otp_.push(new Photon(this.bit_, this.basis_, this.polar_));
                this.am_.pushEvePhoton(new Photon(this.bit_, this.basis_, this.polar_));

            }
        }
        return this.otp_
    }

    // Utility print functions for debugging.
    printOTP() { for(let i = 0; i < this.otp_.length; i++) { console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar()); } }
    printBOTP() { for(let i = 0; i < this.botp_.length; i++) { console.log(i + ".) " + this.botp_[i]); } }
};

// This is a class to manage the BB84 protocol.
class BB84 {
    constructor() {
        this.a_ = new Alice();
        this.b_ = new Bob();
        this.e_ = new Eve();

        this.agreedOTP_ = [];

        this.errorRate_ = 0;

        this.eveIntercept_ = false;
        this.eveDetect_ = false;
    }

    // To run the protocol we need to know the size of the key and if Eve will be intercepting photons.
    runProtocol(keySize, eveIntercept) {
        if(eveIntercept) {
            this.agreedOTP_ = this.a_.compareOTP(this.b_.measureOTP(this.e_.measureOTP(this.a_.generateOTP(keySize))));
            this.eveIntercept_ = true;
        } else {
            this.agreedOTP_ = this.a_.compareOTP(this.b_.measureOTP(this.a_.generateOTP(keySize)));
            this.eveIntercept_ = false;
        }

        this.errorRate_ = Math.ceil((1 - (this.agreedOTP_.length / keySize)) * 100);

        if(this.errorRate_ > 70)
            this.eveDetect_ = true;
    }

    // Getters
    getErrorRate() { return this.errorRate_; }
    getEveIntercept() { return this.eveIntercept_; }
    getEveDetect() { return this.eveDetect_; }
    getAgreedOTP() { return this.agreedOTP_; }

    // Utility print function.
    simResults() {
        console.log("Sim #1");
        console.log("Error Rate: " + this.errorRate_ + "%");
        console.log("Eve Intercept: " + this.eveIntercept_);
        console.log("Eve Detection: " + this.eveDetect_ + "\n" + "\n");
    }
};

const keySize = 256;
let animMan = new AnimManager();

// Variables to store our photon arrays in.
let animAlicePhotons;
let animEvePhotons;

// Variables to store our basis arrays in.
let animBobBasis;
let animEveBasis;

// Executed once upon page load
function main() {
    let bb = new BB84();
    bb.runProtocol(keySize, true);
    bb.simResults();

    animAlicePhotons = animMan.getAlicePhotons();
    animEvePhotons = animMan.getEvePhotons();
}

// We assign each to an image to represent Alice, Bob, and Eve during the animation.
let alice;
let bob;
let eve;

// Varibles to change image of basis for Bob and eve during the animation.
let bobBasis;
let eveBasis;

// We assign each to an image and exchange them during animation.
let zeroDeg;
let fortyfiveDeg;
let ninetyDeg;
let hundredthirtyfiveDeg;

// Variable to change background image.
let background;

// Want x to start at Alice.
let x = window.innerWidth * (1/3);

// Variable to change image of photon during the animation.
let photon;

// inc = increment to access our arrays of animation commands.
let inc;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function preload() {
    alice = loadImage('alice.png');
    bob = loadImage('bob.png');
    eve = loadImage('eve.png');

    plusMeasure = loadImage('+measure.png');
    xMeasure = loadImage('xmeasure.png');

    bobBasis = plusMeasure;
    eveBasis = xMeasure;


    zeroDeg = loadImage('1+0.png');
    fortyfiveDeg = loadImage('0x45.png');
    ninetyDeg = loadImage('0+90.png');
    hundredthirtyfiveDeg = loadImage('1x135.png');

    bbackground = loadImage('background.png');

    inc = 0;

    photon = zeroDeg;
    image(photon, window.innerWidth * (1/3), window.innerHeight * (1/3), 32, 32)
}

function draw() {
    background(bbackground);

    if(animBobBasis[inc] == "+") { bobBasis = plusMeasure; }
    else if(animBobBasis[inc] == "x") { bobBasis = xMeasure; }
    
    if(animEveBasis[inc] == "+") { eveBasis = plusMeasure; }
    else if(animEveBasis[inc] == "x") { eveBasis = xMeasure; }

    if((x < window.innerWidth * (1/3)) || (x < window.innerWidth * (1/2))) {

        if(animAlicePhotons[inc] == "zeroDeg") { photon = zeroDeg; }
        else if(animAlicePhotons[inc] == "fortyfiveDeg") { photon = fortyfiveDeg; }
        else if(animAlicePhotons[inc] == "ninetyDeg") { photon = ninetyDeg; }
        else if(animAlicePhotons[inc] == "hundredthirtyfiveDeg") { photon = hundredthirtyfiveDeg; }

    }
    else if((x >= window.innerWidth * (1/2)) || (x > window.innerWidth * (2/3))) {

        if(animEvePhotons[inc] == "zeroDeg") { photon = zeroDeg; }
        else if(animEvePhotons[inc] == "fortyfiveDeg") { photon = fortyfiveDeg; }
        else if(animEvePhotons[inc] == "ninetyDeg") { photon = ninetyDeg; }
        else if(animEvePhotons[inc] == "hundredthirtyfiveDeg") { photon = hundredthirtyfiveDeg; }


    }

    image(photon, x, window.innerHeight * (1/3), 32, 32)

    image(bobBasis, window.innerWidth * (7/12), window.innerHeight * (1/3));
    image(eveBasis, window.innerWidth * (1/2), window.innerHeight * (1/3));

    x += 5;

    if((x < window.innerWidth * (1/3)) || (x > window.innerWidth * (2/3))) {
        x =  window.innerWidth * (1/3);

        inc++;
    }

    image(alice, window.innerWidth * (1/3) - 32, window.innerHeight * (1/3));
    image(bob, window.innerWidth * (2/3) + 32, window.innerHeight * (1/3));
    image(eve, window.innerWidth * (1/2), window.innerHeight * (1/3) - 40);

    if(inc >= keySize) { location.reload() }

}
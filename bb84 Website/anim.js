class AnimManager {
    constructor() {
        if(AnimManager.instance instanceof AnimManager) {
            return AnimManager.instance;
        }

        this.AnimManagerObject = {};
        
        this.alicePhotons_ = [];
        this.evePhotons_ = [];
        this.bobMeasure_ = [];
        this.eveMeasure_ = [];

        Object.freeze(this.AnimManagerObject);
        Object.freeze(this);
        AnimManager.instance = this;
    }

    getAlicePhotons() {
        return this.alicePhotons_;
    }
    getEvePhotons() {
        return this.evePhotons_;
    }
    getBobMeasure() {
        return this.bobMeasure_;
    }
    getEveMeasure() {
        return this.eveMeasure_;
    }


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

    pushEvePhoton(photon) {
        if(photon.getBasis() == "+") {
            if(photon.getPolar() == "0") {
                this.evePhotons_.push("zeroDeg");

            } else if(photon.getPolar() == "90") {
                this.evePhotons_.push("ninetyDeg");
            }

        } else if(photon.getBasis() == "x") {
            if(photon.getPolar() == "45") {
                this.evePhotons_.push("fortyfiveDeg");

            } else if(photon.getPolar() == "135") {
                this.evePhotons_.push("hundredthirtyfiveDeg");
            }

        }
        this.pushEveMeasure(photon.getBasis());

    }

    pushBobMeasure(basis) {
        if(basis == "+") {
            this.bobMeasure_.push("+");

        } else if (basis == "x") {
            this.bobMeasure_.push("x");

        }
    }

    pushEveMeasure(basis) {
        if(basis == "+") {
            this.eveMeasure_.push("+");

        } else if (basis == "x") {
            this.eveMeasure_.push("x");
            
        }
    }


    printAlicePhotons() {
        console.log("Photons sent by Alice");
        for(let i = 0; i < this.alicePhotons_.length; ++i) {
            console.log(this.alicePhotons_[i]);
        }
    }

    printEvePhotons() {
        console.log("Photons sent by Eve");
        for(let i = 0; i < this.evePhotons_.length; ++i) {
            console.log(this.evePhotons_[i]);
        }
    }

    printBEMeasure() {
        console.log("Bob");
        for(let i = 0; i < this.bobMeasure_.length; ++i) {
            console.log(this.bobMeasure_[i]);
        }

        console.log("Eve");
        for(let i = 0; i < this.eveMeasure_.length; ++i) {
            console.log(this.eveMeasure_[i]);
        }

    }


};

class Photon {
    constructor(bit, basis, polar){
        this.bit_ = bit;
        this.basis_ = basis;
        this.polar_ = polar;
    }

    getBit() { return this.bit_; }
    getBasis() { return this.basis_; }
    getPolar() { return this.polar_; }

    setBit(newBit) { this.bit_ = newBit; }
    setBasis(newBasis) { this.basis_ = newBasis; }
    setPolar(newPolar) { this.polar_ = newPolar; }
}

class Alice {
    constructor() {
        this.bit_ = "1";
        this.basis_ = "+";
        this.polar_ = "0";
        this.otp_ = [];
        this.botp_ = [];

        this.am_ = new AnimManager();
    }

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

    generateOTP(size) {
        for(let i = 0; i < size; i++) {
            this.randBitBasisPolar()
            this.am_.pushAlicePhoton(new Photon(this.bit_, this.basis_, this.polar_));
            this.otp_.push(new Photon(this.bit_, this.basis_, this.polar_));
        }
        return this.otp_;
    }

    compareOTP(inOTP) {
        for(let i = 0; i < inOTP.length; i++) {
            if((this.otp_[i].getBasis() == inOTP[i].getBasis()) && (this.otp_[i].getBit() == inOTP[i].getBit()) && (this.otp_[i].getPolar() == inOTP[i].getPolar())) {
                this.botp_.push(inOTP[i].getBit());
            }
        }
        return this.botp_;
    }

    printOTP() {
        for(let i = 0; i < this.otp_.length; i++) {
            console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar());
        }
    }

    printBOTP() {
        for(let i = 0; i < this.botp_.length; i++) {
            console.log(i + ".) " + this.botp_[i]);
        }
    }
}

class Bob {
    constructor() {
        this.bit_ = "1";
        this.basis_ = "+";
        this.polar_ = "0";
        this.otp_ = [];

        this.am_ = new AnimManager();
    }

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

    measureOTP(inOTP) {
        for(let i = 0; i < inOTP.length; i++) {
            this.randBitBasisPolar();

            this.am_.pushBobMeasure(this.basis_);

            if(inOTP[i].getBasis() == this.basis_ ) {
                
                if(inOTP[i].getPolar() == "0")
                    this.otp_.push(new Photon("1", "+", "0"));
                
                else if(inOTP[i].getPolar() == "45")
                    this.otp_.push(new Photon("0", "x", "45"));

                else if(inOTP[i].getPolar() == "90")
                    this.otp_.push(new Photon("0", "+", "90"));

                else if(inOTP[i].getPolar() == "135")
                    this.otp_.push(new Photon("1", "x", "135"));
            } else {
                this.otp_.push(new Photon("U", this.basis_, this.polar_));
            }
        }
        return this.otp_;
    }

    printOTP() {
        for(let i = 0; i < this.otp_.length; i++) {
            console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar());
        }
    }

    printBOTP() {
        for(let i = 0; i < this.botp_.length; i++) {
            console.log(i + ".) " + this.botp_[i]);
        }
    }
}

class Eve {
    constructor() {
        this.bit_ = "1";
        this.basis_ = "+";
        this.polar_ = "0";
        this.otp_ = [];

        this.am_ = new AnimManager();
    }

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

    measureOTP(inOTP) {
        for(let i = 0; i < inOTP.length; i++) {
            this.randBitBasisPolar();


            if(inOTP[i].getBasis() == this.basis_ && inOTP[i].getPolar() == this.polar_) {
                this.otp_.push(inOTP[i]);
                this.am_.pushEvePhoton(inOTP[i]);

            } else if(inOTP[i].getBasis() == this.basis_ && inOTP[i].getPolar() != this.polar_) {
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

    printOTP() {
        for(let i = 0; i < this.otp_.length; i++) {
            console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar());
        }
    }

    printBOTP() {
        for(let i = 0; i < this.botp_.length; i++) {
            console.log(i + ".) " + this.botp_[i]);
        }
    }
}

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

    getErrorRate() { return this.errorRate_; }
    getEveIntercept() { return this.eveIntercept_; }
    getEveDetect() { return this.eveDetect_; }
    getAgreedOTP() { return this.agreedOTP_; }

    simResults() {
        console.log("Sim #1");
        console.log("Error Rate: " + this.errorRate_ + "%");
        console.log("Eve Intercept: " + this.eveIntercept_);
        console.log("Eve Detection: " + this.eveDetect_ + "\n" + "\n");
    }
}

const keySize = 256;
let am = new AnimManager();

let ap;
let ep;
let ab;
let ae;



function main() {
    let b = new BB84();
    b.runProtocol(keySize, true);
    b.simResults();


    ap = am.getAlicePhotons();
    ep = am.getEvePhotons();

    ab = am.getBobMeasure();
    ae = am.getEveMeasure();


    //am.printAlicePhotons();
    //console.log("\n");
    //am.printEvePhotons();
//
    //am.printBEMeasure();

    
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

let winBackground;

let x = window.innerWidth * (1/3);

let photon;

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

    winBackground = loadImage('background.png');

    inc = 0;

    photon = zeroDeg;
    image(photon, window.innerWidth * (1/3), window.innerHeight * (1/3), 32, 32)
    

}

function draw() {
    background(winBackground);

    if(ab[inc] == "+") {
        bobBasis = plusMeasure;
    } else if(ab[inc] == "x") {
        bobBasis = xMeasure;
    }

    if(ae[inc] == "+") {
        eveBasis = plusMeasure;
    } else if(ae[inc] == "x") {
        eveBasis = xMeasure;
    }


    if((x < window.innerWidth * (1/3)) || (x < window.innerWidth * (1/2))) {
        if(ap[inc] == "zeroDeg") {
            photon = zeroDeg;
        } else if(ap[inc] == "fortyfiveDeg") {
            photon = fortyfiveDeg;
        } else if(ap[inc] == "ninetyDeg") {
            photon = ninetyDeg;
        } else if(ap[inc] == "hundredthirtyfiveDeg") {
            photon = hundredthirtyfiveDeg;
        }
    }
    else if((x >= window.innerWidth * (1/2)) || (x > window.innerWidth * (2/3))) {
        if(ep[inc] == "zeroDeg") {
            photon = zeroDeg;
        } else if(ep[inc] == "fortyfiveDeg") {
            photon = fortyfiveDeg;
        } else if(ep[inc] == "ninetyDeg") {
            photon = ninetyDeg;
        } else if(ep[inc] == "hundredthirtyfiveDeg") {
            photon = hundredthirtyfiveDeg;
        }
    }

    if((x < window.innerWidth * (1/3)) || (x > window.innerWidth * (2/3))) {        
        console.log("Alice = " + ap[inc]);
        console.log("Eve = " + ep[inc]);
    }

    image(photon, x, window.innerHeight * (1/3), 32, 32)

    
    image(bobBasis, window.innerWidth * (7/12), window.innerHeight * (1/3));
    image(eveBasis, window.innerWidth * (1/2), window.innerHeight * (1/3));

    x += 2;

    if((x < window.innerWidth * (1/3)) || (x > window.innerWidth * (2/3))) {
        x =  window.innerWidth * (1/3);

        inc++;
    }

    image(alice, window.innerWidth * (1/3) - 32, window.innerHeight * (1/3));
    image(bob, window.innerWidth * (2/3) + 32, window.innerHeight * (1/3));
    image(eve, window.innerWidth * (1/2), window.innerHeight * (1/3) - 40);

    if(inc >= keySize) { location.reload() }

}
class AnimManager {
    constructor() {
        this.photons_ = [];
        this.bobMeasure_ = [];
        this.eveMeasure_ = [];
    }

    pushPhoton(photon) {
        if(photon == new Photon("1", "+", "0"))
            this.photons_.push("zeroDeg");
        else if(photon == new Photon("0", "x", "45"))
            this.photons_.push("fortyfiveDeg");
        else if(photon == new Photon("0", "+", "90"))
            this.photons_.push("ninetyDeg");
        else if(photon == new Photon("1", "x", "135"))
            this.photons_.push("hundredthirtyfiveDeg")
    }

    pushBobMeasure() {

    }

    pushEveMeasure() {

    }

}

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
            this.basis_ = "x"
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
            this.otp_.push(new Photon(this.bit_, this.basis_, this.polar_))
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
            } else if(inOTP[i].getBasis() == this.basis_ && inOTP[i].getPolar() != this.polar_) {
                if(inOTP[i].getPolar() == "0")
                    this.otp_.push(new Photon("1", "+", "0"));
                
                else if(inOTP[i].getPolar() == "45")
                    this.otp_.push(new Photon("0", "x", "45"));

                else if(inOTP[i].getPolar() == "90")
                    this.otp_.push(new Photon("0", "+", "90"));

                else if(inOTP[i].getPolar() == "135")
                    this.otp_.push(new Photon("1", "x", "134"));
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
            this.randBitBasisPolar()
            if(inOTP[i].getBasis() == this.basis_ && inOTP[i].getPolar() == this.polar_) {
                this.otp_.push(inOTP[i]);
            } else if(inOTP[i].getBasis() == this.basis_ && inOTP[i].getPolar() != this.polar_) {
                if(inOTP[i].getPolar() == "0")
                    this.otp_.push(new Photon("1", "+", "0"));
                
                else if(inOTP[i].getPolar() == "45")
                    this.otp_.push(new Photon("0", "x", "45"));

                else if(inOTP[i].getPolar() == "90")
                    this.otp_.push(new Photon("0", "+", "90"));

                else if(inOTP[i].getPolar() == "135")
                    this.otp_.push(new Photon("1", "x", "134"));
            } else {
                this.otp_.push(new Photon("U", this.basis_, this.polar_));
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


function main() {
    let b = new BB84();
    b.runProtocol(512, false);
    b.simResults();
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

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function preload() {
    alice = loadImage('alice.png');
    bob = loadImage('bob.png');
    eve = loadImage('eve.png');

    bobBasis = loadImage('+measure.png');
    eveBasis = loadImage('+measure.png');

    zeroDeg = loadImage('1+0.png');
    fortyfiveDeg = loadImage('0x45.png');
    ninetyDeg = loadImage('0+90.png');
    hundredthirtyfiveDeg = loadImage('1x135.png');

    winBackground = loadImage('background.png');

    photon = zeroDeg;
    image(photon, window.innerWidth * (1/3), window.innerHeight * (1/3), 32, 32)
    

}

function draw() {
    background(winBackground);

    x += 5;
    image(photon, x, window.innerHeight * (1/3), 32, 32)

    if((x < window.innerWidth * (1/3)) || (x > window.innerWidth * (2/3))) {
        x =  window.innerWidth * (1/3);

        if(Math.floor(Math.random() * 2) % 2 == 0) {
            photon = zeroDeg;

        } else {
            photon = fortyfiveDeg;

        }
    }

    image(alice, window.innerWidth * (1/3) - 32, window.innerHeight * (1/3));
    image(bob, window.innerWidth * (2/3) + 32, window.innerHeight * (1/3));
    image(eve, window.innerWidth * (1/2), window.innerHeight * (1/3) - 40);

    image(bobBasis, window.innerWidth * (7/12), window.innerHeight * (1/3));
    image(eveBasis, window.innerWidth * (1/2), window.innerHeight * (1/3));


}
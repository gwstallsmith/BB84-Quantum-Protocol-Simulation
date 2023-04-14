// This is the AnmMnger
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
        this.bobMeasure_ = [];
        this.eveMeasure_ = [];

        Object.freeze(this.AnimManagerObject);
        Object.freeze(this);
        AnimManager.instance = this;
    }

    // Getters, nothing too special
    getAlicePhotons() { return this.alicePhotons_; }
    getEvePhotons() { return this.evePhotons_; }
    getBobMeasure() { return this.bobMeasure_; }
    getEveMeasure() { return this.eveMeasure_; }

    // We are keeping track of the animations with a quasi stack.
    // This method allows us store all of the types of photons Alice will send in order.
    pushAlicePhoton(photon) {
        if(photon.getBasis() == "+") {
            if(photon.getPolar() == "0") { this.alicePhotons_.push("zeroDeg"); }
            else if(photon.getPolar() == "90") { this.alicePhotons_.push("ninetyDeg"); }

        } else if(photon.getBasis() == "x") {
            if(photon.getPolar() == "45") { this.alicePhotons_.push("fortyfiveDeg"); }
            else if(photon.getPolar() == "135") { this.alicePhotons_.push("hundredthirtyfiveDeg"); }
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

        this.pushEveMeasure(photon.getBasis());
    }

    // This method allows us to store every basis Bob uses in order.
    pushBobMeasure(basis) {
        if(basis == "+") { this.bobMeasure_.push("+"); }
        else if (basis == "x") { this.bobMeasure_.push("x"); }
    }

    // This method allows us to store every basis Bob uses in order.
    // Used in pushEvePhoton()
    pushEveMeasure(basis) {
        if(basis == "+") { this.eveMeasure_.push("+"); }
        else if (basis == "x") { this.eveMeasure_.push("x"); }
    }

    // Utility print functions for debugging.
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
        for(let i = 0; i < this.bobMeasure_.length; ++i) { console.log(this.bobMeasure_[i]); }

        console.log("Eve");
        for(let i = 0; i < this.eveMeasure_.length; ++i) { console.log(this.eveMeasure_[i]); } 
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

    getBit() { return this.bit_; }
    getBasis() { return this.basis_; }
    getPolar() { return this.polar_; }

    setBit(newBit) { this.bit_ = newBit; }
    setBasis(newBasis) { this.basis_ = newBasis; }
    setPolar(newPolar) { this.polar_ = newPolar; }
}

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
        this.potp_ = [];

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
    generateOTP(size) {
        for(let i = 0; i < size; i++) {
            this.randBitBasisPolar()
            this.am_.pushAlicePhoton(new Photon(this.bit_, this.basis_, this.polar_));
            this.otp_.push(new Photon(this.bit_, this.basis_, this.polar_));
        }
        this.potp_ = this.otp_;
        return this.otp_;
    }

    // This method is used to compare the bit values Alice sent and bit values Bob received.
    compareOTP(inOTP) {
        let tempOTP = []
        for(let i = 0; i < inOTP.length; i++) {
            if((this.otp_[i].getBasis() == inOTP[i].getBasis())) {
                this.botp_.push(inOTP[i].getBit());
                tempOTP.push(this.otp_[i]);
            }
        }

        this.otp_ = tempOTP;
        return this.botp_;
    }

    calcErrorRate() {
        let errorAmount = 0;
        let subsetSize = 0;


        // Making sure the subsetSize is reasonable for comparison
        while(subsetSize < (this.otp_.length / 3)) {
            subsetSize =  Math.ceil(Math.random() * this.otp_.length);
        }

        for(let i = 0; i < subsetSize; i++) {
            if(this.botp_[i] != this.otp_[i].getBit()) {
                errorAmount++;
            }
        }
        // They then compare a random subset of the photons they are keeping.
        // If the error rate is above an acceptable threshold, 20%, they conclude there is Eve

        // Need photons we're keeping (we know they're measured in the correct basis)
        // Compare bit values and find error rate
        return (errorAmount / subsetSize);
    }

    getOTP() { return this.otp_; }
    getBOTP() { return this.botp_; }
    getPOTP() { return this.potp_; }

    // Utility print functions for debugging.
    printOTP() { for(let i = 0; i < this.otp_.length; i++) { console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_[i].getPolar()); } }
    printBOTP() { for(let i = 0; i < this.botp_.length; i++) { console.log(i + ".) " + this.botp_[i]); } }
}

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

            this.am_.pushBobMeasure(this.basis_);

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
                    this.otp_.push(new Photon("1", "x", "135"));
            } else {
                this.otp_.push(new Photon("U", this.basis_, this.polar_));
            }
        }
        return this.otp_;
    }

    getOTP() { return this.otp_; }

    // Utility print functions for debugging.
    printOTP() { for(let i = 0; i < this.otp_.length; i++) { console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_[i].getPolar()); } }
}

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

    randPhoton(inBasis) {
        if(inBasis == '+') {
            if(Math.floor(Math.random() * 2) % 2 == 0) {
                return new Photon("0", "x", "45");
            } else {
                return new Photon("1", "x", "135");
            }
        } else if (inBasis == 'x') {
            if(Math.floor(Math.random() * 2) % 2 == 0) {
                return new Photon("1", "+", "0");
            } else {
                return new Photon("0", "+", "90");
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
                this.otp_.push(this.randPhoton(inOTP[i].getBasis()));
                this.am_.pushEvePhoton(this.randPhoton(inOTP[i].getBasis()));
            }
        }
        return this.otp_
    }

    getOTP() { return this.otp_; }

    // Utility print functions for debugging.
    printOTP() { for(let i = 0; i < this.otp_.length; i++) { console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_[i].getPolar()); } }
}

// This is a class to manage the BB84 protocol.
const ACCEPTABLE_ERROR_RATE = 0.2;

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

    getAlice() { return this.a_; }
    getBob() { return this.b_; }
    getEve() { return this.e_; }

    // To run the protocol we need to know the size of the key and if Eve will be intercepting photons.
    runProtocol(keySize, eveIntercept) {
        let inOTP;
        if(eveIntercept) {
            inOTP = this.b_.measureOTP(this.e_.measureOTP(this.a_.generateOTP(keySize)));
            this.agreedOTP_ = this.a_.compareOTP(inOTP);

            this.a_.calcErrorRate(inOTP);

            this.eveIntercept_ = true;
        } else {
            inOTP = this.b_.measureOTP(this.a_.generateOTP(keySize))
            this.agreedOTP_ = this.a_.compareOTP(inOTP);

            
            this.eveIntercept_ = false;
        }

        this.errorRate_ = this.a_.calcErrorRate(inOTP);


        if(this.errorRate_ > ACCEPTABLE_ERROR_RATE)
            this.eveDetect_ = true;
    }

    getErrorRate() { return this.errorRate_; }
    getEveIntercept() { return this.eveIntercept_; }
    getEveDetect() { return this.eveDetect_; }
    getAgreedOTP() { return this.agreedOTP_; }

    // Utility print function.
    simResults() {
        console.log("Sim:");
        console.log("Error Rate: " + Math.ceil(this.errorRate_ * 100) + "%");
        console.log("Eve Intercept: " + this.eveIntercept_);
        console.log("Eve Detection: " + this.eveDetect_ + "\n" + "\n");
    }
}

//
//
// Animation Logic Below
//
//

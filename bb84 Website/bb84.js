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
        if(Math.random() % 2 == 0){
            this.basis_ = "+";
            if(Math.random() % 2 == 0) {
                this.polar_ = "0";
                this.bit_ = "1";
            } else {
                this.polar_ = "90";
                this.bit_ = "0";
            }
        } else {
            this.basis_ = "x"
            if(Math.random() % 2 == 0) {
                this.polar_ = "45";
                this.bit_ = "0";
            } else {
                this.polar_ = "135";
                this.bit_ = "1";
            }
        }
    }

    generateOTP(size) {
        for(let i = 0; i < size; ++i) {
            this.randBitBasisPolar()
            this.otp_.push(new Photon(this.bit_, this.basis_, this.polar_))
        }
        return this.otp_;
    }

    compareOTP(inOTP) {
        for(let i = 0; i < inOTP.length; ++i) {
            if(this.otp_[i] == inOTP[i]) {
                this.botp_.push(inOTP[i].getBit());
            }
        }
        return this.botp_;
    }

    printOTP() {
        for(let i = 0; i < this.otp_.length; ++i) {
            console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar());
        }
    }

    printBOTP() {
        for(let i = 0; i < this.botp_.length; ++i) {
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
        if(Math.random() % 2 == 0){
            this.basis_ = "+";
            if(Math.random() % 2 == 0) {
                this.polar_ = "0";
                this.bit_ = "1";
            } else {
                this.polar_ = "90";
                this.bit_ = "0";
            }
        } else {
            this.basis_ = "x";
            if(Math.random() % 2 == 0) {
                this.polar_ = "45";
                this.bit_ = "0";
            } else {
                this.polar_ = "135";
                this.bit_ = "1";
            }
        }
    }

    measureOTP(inOTP) {
        for(let i = 0; i < inOTP.length; ++i) {
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
        for(let i = 0; i < this.otp_.length; ++i) {
            console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar());
        }
    }

    printBOTP() {
        for(let i = 0; i < this.botp_.length; ++i) {
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
        if(Math.random() % 2 == 0){
            this.basis_ = "+";
            if(Math.random() % 2 == 0) {
                this.polar_ = "0";
                this.bit_ = "1";
            } else {
                this.polar_ = "90";
                this.bit_ = "0";
            }
        } else {
            this.basis_ = "x";
            if(Math.random() % 2 == 0) {
                this.polar_ = "45";
                this.bit_ = "0";
            } else {
                this.polar_ = "135";
                this.bit_ = "1";
            }
        }
    }

    measureOTP(inOTP) {
        for(let i = 0; i < inOTP.length; ++i) {
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
        for(let i = 0; i < this.otp_.length; ++i) {
            console.log(i + ".) " + this.otp_[i].getBit() + " " + this.otp_[i].getBasis() + " " + this.otp_.getPolar());
        }
    }

    printBOTP() {
        for(let i = 0; i < this.botp_.length; ++i) {
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
        } else 
            this.agreedOTP_ = this.a_.compareOTP(this.b_.measureOTP(this.a_.generateOTP(keySize)));


        this.errorRate_ = ((this.agreedOTP_.length * 100) / keySize);

        if(this.errorRate_ < 40)
            this.eveDetect_ = true;
    }

    getErrorRate() { return this.errorRate_; }
    getEveIntercept() { return this.eveIntercept_; }
    getEveDetect() { return this.eveDetect_; }
    getAgreedOTP() { return this.agreedOTP_; }
}

class SimManager {
    constructor(simCount) {
        this.simCount_ = simCount;
        this.simList_ = [];
        for(let i = 0; i < simCount; ++i) {
            this.simList_.push(new BB84());
        }

    }

    runSim(keySize, eveInterceptChance) {
        for(let i = 0; i < this.simCount_; i++) {
            //if(Math.random() % eveInterceptChance == 0) {
            //    this.simList_[i].runProtocol(keySize, true);
            //} else {
                this.simList_[i].runProtocol(keySize, false)
            //}
        }
    }

    simResults() {
        for(let i = 0; i < this.simCount_; ++i) {
            console.log("Sim #" + i);
            console.log("Error Rate: " + this.simList_[i].getErrorRate());
            console.log("Eve Intercept: " + this.simList_[i].getEveIntercept());
            console.log("Eve Detection: " + this.simList_[i].getErrorRate() + "\n");
        }
    }
}

function main() {
    let s = new SimManager(10);
    s.runSim(100, 2);
    s.simResults()
}
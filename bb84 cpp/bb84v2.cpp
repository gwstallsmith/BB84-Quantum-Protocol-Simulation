#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>

using std::cin; using std::cout; using std::endl;
using std::string; using std::vector;


class Qubit {
public:
    Qubit() : bit_("1"), basis_("+"), polar_("0") {}

    Qubit(string bit, string basis, string polar){
        bit_ = bit;
        basis_ = basis;
        polar_ = polar;
    }

    void operator=(const Qubit &Q){
        setBit(Q.bit_);
        setBasis(Q.basis_);
        setPolar(Q.polar_);
    }

    bool operator==(const Qubit &Q) {
        if(bit_ == Q.bit_ && basis_ == Q.basis_ && polar_ == Q.polar_)
            return true;
        else
            return false;
    }

    // Getters, not much interesting here
    string getBit(){ return bit_; }
    string getBasis() { return basis_; }
    string getPolar() { return polar_; }

    // Setters
    void setBit(string newBit) { bit_ = newBit; }
    void setBasis(string newBasis) { basis_ = newBasis; }
    void setPolar(string newPolar) { polar_ = newPolar; }

private:
    string bit_;
    string basis_;
    string polar_;
};

class Alice {
public:
    Alice() : bit_("0"), basis_("+"), otp_({}), botp_({}) {}

    vector<Qubit> generateOTP(int size) {
        otp_.resize(size);
        for(auto &q : otp_) {
            randBasisPolarBit();
            q = Qubit(bit_, basis_, polar_);
        }
        return otp_;
    }

    string randBit() { if(rand() % 2 == 0) return "0"; else return "1"; }

    void randBasisPolarBit() {
        if(rand() % 2 == 0) {
            basis_ = "+";
            if(rand() % 2 == 0) {
                polar_ = "0";
                bit_ = "1";
            }
            else {
                polar_ = "90";
                bit_ = "0";
            }
        } else {
            basis_ = "x";
            if(rand() % 2 == 0) {
                polar_ = "45";
                bit_ = "0";
            }
            else {
                polar_ = "135";
                bit_ = "1";
            }
        }
    }

    vector<string> compareOTP(vector<Qubit> inOTP){
        for(int i = 0; i < inOTP.size(); i++) {
            if(otp_[i] == inOTP[i]){
                botp_.push_back(otp_[i].getBit());
            }
        }
        return botp_;
    }


    void printOTP() { int i = 0; for(auto &q : otp_) { cout << i++ << ".) "; cout << q.getBit() << " " << q.getBasis() << " " << q.getPolar() << endl; } }

    void printBOTP() { int i = 0; for(auto &str: botp_) { cout << i++ << ".) "; cout << str << endl; } }


private:
    // One Time Pad / Shared Key
    // otp_ is a cleaner name
    string bit_;
    string basis_;
    string polar_;
    vector<Qubit> otp_;
    // Final bit otp
    vector<string> botp_;
};

class Bob {
public:
    Bob() : bit_("0"), basis_("+"), polar_("0"), otp_({}), botp_({}) {}

    vector<Qubit> measureOTP(vector<Qubit> inOTP) {
        otp_.resize(inOTP.size());

        for(int i = 0; i < inOTP.size(); i++) {
            randBasisPolarBit();

            if(inOTP[i].getBasis() == basis_ && inOTP[i].getPolar() == polar_)
                otp_[i] = inOTP[i];

            else if(inOTP[i].getBasis() == basis_ && inOTP[i].getPolar() != polar_) {
                if(inOTP[i].getPolar() == "0")
                    otp_[i] = Qubit("1", "+", "0");

                else if(inOTP[i].getPolar() == "45")
                    otp_[i] = Qubit("0", "x", "45");

                else if(inOTP[i].getPolar() == "90")
                    otp_[i] = Qubit("0", "+", "90");

                else if(inOTP[i].getPolar() == "135")
                    otp_[i] = Qubit("1", "x", "135");

            } else
                otp_[i] = Qubit("U", basis_, polar_);

        }
        return otp_;
    }

    void randBasisPolarBit() {
        if(rand() % 2 == 0) {
            basis_ = "+";
            if(rand() % 2 == 0) {
                polar_ = "0";
                bit_ = "1";
            }
            else {
                polar_ = "90";
                bit_ = "0";
            }
        } else {
            basis_ = "x";
            if(rand() % 2 == 0) {
                polar_ = "45";
                bit_ = "0";
            }
            else {
                polar_ = "135";
                bit_ = "1";
            }
        }
    }


    void printOTP() { int i = 0; for(auto &q : otp_) { cout << i++ << ".) "; cout << q.getBit() << " " << q.getBasis() << " " << q.getPolar() << endl; } }

    void printBOTP() { int i = 0; for(auto &str: botp_) { cout << i++ << ".) "; cout << str << endl; } }


private:
    string bit_;
    string basis_;
    string polar_;
    vector<Qubit> otp_;
    vector<string> botp_;
};

class Eve {
public:
    Eve() : bit_("0"), basis_("+"), polar_("0"), otp_({}), botp_({}) {}

    vector<Qubit> measureOTP(vector<Qubit> inOTP) {
        otp_.resize(inOTP.size());

        for(int i = 0; i < inOTP.size(); i++) {
            randBasisPolarBit();

            if(inOTP[i].getBasis() == basis_ && inOTP[i].getPolar() == polar_)
                otp_[i] = inOTP[i];

            else if(inOTP[i].getBasis() == basis_ && inOTP[i].getPolar() != polar_) {
                if(inOTP[i].getPolar() == "0")
                    otp_[i] = Qubit("1", "+", "0");

                else if(inOTP[i].getPolar() == "45")
                    otp_[i] = Qubit("0", "x", "45");

                else if(inOTP[i].getPolar() == "90")
                    otp_[i] = Qubit("0", "+", "90");

                else if(inOTP[i].getPolar() == "135")
                    otp_[i] = Qubit("1", "x", "135");

            } else {
                otp_[i] = Qubit(bit_, basis_, polar_);
            }

        }
        return otp_;
    }

    void randBasisPolarBit() {
        if(rand() % 2 == 0) {
            basis_ = "+";
            if(rand() % 2 == 0) {
                polar_ = "0";
                bit_ = "1";
            }
            else {
                polar_ = "90";
                bit_ = "0";
            }
        } else {
            basis_ = "x";
            if(rand() % 2 == 0) {
                polar_ = "45";
                bit_ = "0";
            }
            else {
                polar_ = "135";
                bit_ = "1";
            }
        }
    }


    void printOTP() { int i = 0; for(auto &q : otp_) { cout << i++ << ".) "; cout << q.getBit() << " " << q.getBasis() << " " << q.getPolar() << endl; } }

    void printBOTP() { int i = 0; for(auto &str: botp_) { cout << i++ << ".) "; cout << str << endl; } }


private:
    string bit_;
    string basis_;
    string polar_;
    vector<Qubit> otp_;
    vector<string> botp_;
};

class BB84 {
public:
    BB84() : a_(Alice()), b_(Bob()), e_(Eve()), errorRate_(0), eveIntercept_(false), detectEve_(false) {}

    void runProtocol(int keySize, bool EveIntercept) {
        if(EveIntercept) {
            agreedOTP_ = a_.compareOTP(b_.measureOTP(e_.measureOTP((a_.generateOTP(keySize)))));
            eveIntercept_ = true;
        } else {
            agreedOTP_ = a_.compareOTP(b_.measureOTP(a_.generateOTP(keySize)));
            eveIntercept_ = false;
        }
        errorRate_ = ((agreedOTP_.size() * 100)/ keySize);

        if(errorRate_ < 40)
            detectEve_ = true;
    }

    Alice getAlice() { return a_; }

    int getErrorRate() { return errorRate_; }
    bool getEveIntercept() { return eveIntercept_; }
    bool getDetectEve() { return detectEve_; }
    vector<string> getAgreedOTP() { return agreedOTP_; }
    
private:
    Alice a_;
    Bob b_;
    Eve e_;

    int errorRate_;
    bool eveIntercept_;
    bool detectEve_;
    vector<string> agreedOTP_;
};

class SimManager {
public:
    SimManager() : simCount_(0), simList_({}) {} 

    SimManager(int simCount) {
        simCount_ = simCount;
        simList_.resize(simCount_);
    }

    void runSim(int keySize, int EveInterceptChance) {
        for(int i = 0; i < simCount_; i++) {
            if(rand() % EveInterceptChance == 0) {
                simList_[i].runProtocol(keySize, true);
            } else {
                simList_[i].runProtocol(keySize, false);
            }
        }
    }

    void simResults() {
        cout << "Sim Count: " << simCount_ << endl << endl;
        for(int i = 0; i < simCount_; i++) {
            cout << "Sim #" << i << endl;
            cout << "Eve Intercept: " << simList_[i].getEveIntercept() << endl;
            cout << "Error Rate: " << simList_[i].getErrorRate() << endl;
            cout << "Eve Detection: " << simList_[i].getDetectEve() << endl;
            //cout << "Agreed OTP: " << endl;
            //simList_[i].getAlice().printBOTP();
            cout << endl;
        }
    }


protected:
    int simCount_;
    vector<BB84> simList_;
};

int main() {
    SimManager s(10);

    s.runSim(100, 2);

    s.simResults();
    return 0;
}
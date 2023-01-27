#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>

using std::cin; using std::cout; using std::endl;
using std::string; using std::vector;

class Qubit {
public:
    Qubit() : bit_("0"), basis_("+"), polar_("0") {}

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
    Alice() : basis_("+"), otp_({}), botp_({}) {}

    vector<Qubit> generateOTP(int size) {
        otp_.resize(size);
        for(auto &q : otp_) {
            randBasisPolar();
            q = Qubit(randBit(), basis_, polar_);
        }
        return otp_;
    }

    string randBit() { if(rand() % 2 == 0) return "0"; else return "1"; }

    void randBasisPolar() {
        if(rand() % 2 == 0) {
            basis_ = "+";
            if(rand() % 2 == 0)
                polar_ = "0";
            else
                polar_ = "90";
        } else {
            basis_ = "x";
            if(rand() % 2 == 0)
                polar_ = "45";
            else
                polar_ = "135";
        }
    }

    vector<string> compareOTP(vector<Qubit> inOTP){
        for(int i = 0; i < inOTP.size(); i++) {
            if(otp_[i] == inOTP[i]){
                botp_.push_back(inOTP[i].getBit());
            }
        }
        return botp_;
    }

    void printOTP() { for(auto &q : otp_) { cout << q.getBit() << " " << q.getBasis() << " " << q.getPolar() << endl; } }

    void printBOTP() { for(auto &str: botp_) { cout << str << endl; } }


private:
    // One Time Pad / Shared Key
    // otp_ is a cleaner name
    string basis_;
    string polar_;
    vector<Qubit> otp_;
    // Final bit otp
    vector<string> botp_;
};

class Bob {
public:
    Bob() : basis_("+"), polar_("0"), otp_({}), botp_({}) {}

    vector<Qubit> measureOTP(vector<Qubit> inOTP) {
        otp_.resize(inOTP.size());

        for(int i = 0; i < inOTP.size(); i++) {
            randBasisPolar();
            if(inOTP[i].getBasis() == basis_ && inOTP[i].getPolar() == polar_)
                otp_[i] = inOTP[i];
            else
                otp_[i] = Qubit("U", basis_, polar_);
        }
        return otp_;
    }

    void randBasisPolar() {
        if(rand() % 2 == 0) {
            basis_ = "+";
            if(rand() % 2 == 0)
                polar_ = "0";
            else
                polar_ = "90";
        } else {
            basis_ = "x";
            if(rand() % 2 == 0)
                polar_ = "45";
            else
                polar_ = "135";
        }
    }


    void printOTP() { for(auto &q : otp_) { cout << q.getBit() << " " << q.getBasis() << " " << q.getPolar() << endl; } }

    void printBOTP() { for(auto &str: botp_) { cout << str << endl; } }


private:
    string basis_;
    string polar_;
    vector<Qubit> otp_;
    vector<string> botp_;
};

class Eve {};



int main() {
    srand(time(0));
    Alice a;
    Bob b;

    vector<string> agreedOTP;

    agreedOTP = a.compareOTP(b.measureOTP(a.generateOTP(10)));

    cout << "Alice sends..." << endl;

    a.printOTP();

    cout << endl << "Bob measures..." << endl;

    b.printOTP();

    cout << endl << "Agreed OTP after comparison..." << endl;

    a.printBOTP();

    return 0;
}

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

    // Getters, not much interesting here
    string getBit(){ return bit_; }
    string getState() { return basis_; }
    string getPolar() { return polar_; }

    // Setters that will help with the creation of Qubits
    // We need to make sure we change the qubit vector when we change the bit / state / polarization
    void setBit(string newBit) { bit_ = newBit; }
    void setBasis(string newBasis) { basis_ = newBasis; }
    void setPolar(string newPolar) { polar_ = newPolar; }
    // Qubit keys consist of a bit, a basis, and a polarization


private:
    string bit_;
    string basis_;
    string polar_;
};

class Alice {
public:
    Alice() : otp_({}) {}

    vector<Qubit> generateOTP(int size) {
        otp_.resize(size);
        for(auto &q : otp_) { q = Qubit(randBit(), randBasis(), randPolar()); }
        return otp_;
    }

    string randBit() { if(rand() % 2 == 0) return "0"; else return "1"; }
    string randBasis() { if(rand() % 2 == 0) return "+"; else return "x"; }
    
    string randPolar() {
        int polarChance = rand() % 4;

        if(polarChance == 0) return "0";
        else if(polarChance == 1) return "90";
        else if(polarChance == 2) return "45";
        else return "135";
    }

    void printOTP() { for(auto &q : otp_) { cout << q.getBit() << " " << q.getState() << " " << q.getPolar() << endl; } }


private:
    // One Time Pad / Shared Key
    // otp_ is a cleaner name
    vector<Qubit> otp_;
};

class Bob {};

class Eve {};



int main() {
    srand(time(0));
    Alice a;

    a.generateOTP(8);
    a.printOTP();

    return 0;
}

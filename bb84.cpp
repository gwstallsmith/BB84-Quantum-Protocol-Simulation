#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>

using std::cin; using std::cout; using std::endl;
using std::string; using std::vector;

class Qubit {
public:
    // We may only need the tensor product
    // I suppose it is nice to have bit and state as individual private members
    Qubit() : bit_("0"), basis_("+"), polar_("0"), qubit_({"0", "+", "0"}) {}

    // Getters, not much interesting here
    string getBit(){ return bit_; }
    string getState() { return basis_; }
    string getPolar() { return polar_; }
    vector<string> getSharedKey() { return qubit_; } // The auto is fucking disgusting, but idk how to make a character array a return type

    // Setters that will help with the creation of Qubits
    // We need to make sure we change the qubit vector when we change the bit / state / polarization
    void setBit(string newBit) {
        if(newBit != "0" || newBit != "1")
            return;
        bit_ = newBit;
        qubit_[0] = newBit;
    }
    void setBasis(string newBasis) {
        basis_ = newBasis;
        qubit_[1] = newBasis;
    }
    void setPolar(string newPolar) {
        polar_ = newPolar;
        qubit_[2] = newPolar;
    }
    // Qubit keys consist of a bit, a basis, and a polarization
    void setQubit(string newBit, string newBasis, string newPolar) {
        if((newBit != "0" || newBit != "1") || 
           (newBasis != "+" || newBasis != "x") ||
           (newPolar != "0" || newPolar != "90" || newPolar != "45" || newPolar != "135")) { return; } // Clarifying brackets because the if statement is ugly

        bit_ = newBit;
        qubit_[0] = bit_;

        basis_ = newBasis;
        qubit_[1] = basis_;

        polar_ = newPolar;
        qubit_[2] = polar_;
    }


private:
    string bit_;
    string basis_;
    string polar_;
    vector<string> qubit_;
};

class Alice {
public:
    Alice() : otp_({}) {}

    vector<Qubit> generateOTP(int size = 1) {
        otp_.resize(size);

        for(int i = 0; i < otp_.size(); ++i){
            Qubit(randBit(), randBasis(), randPolar(), {randBit(), randBasis(), randPolar()});




        }
    }

    string randBit() {
        string randBit;
        if(rand() % 2 == 0) randBit = "0"; else randBit = "1";
        return randBit;
    }
    string randBasis() {
        string randBasis;
        if(rand() % 2 == 0) randBasis = "+"; else randBasis = "x";
        return randBasis;
    }
    string randPolar() {
        string randPolar;
        int polarChance = rand() % 4;

        if(polarChance == 0) randPolar = "0";
        else if(polarChance == 1) randPolar = "90";
        else if(polarChance == 2) randPolar = "45";
        else if(polarChance == 3) randPolar = "135";

        return randPolar;
    }


private:
    // One Time Pad / Shared Key
    // otp_ is a cleaner name
    vector<Qubit> otp_;
};

class Bob {};

class Eve {};



int main() {
    srand(time(0));


    return 0;
}

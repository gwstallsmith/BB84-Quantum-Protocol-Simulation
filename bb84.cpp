#include <iostream>
#include <string>
#include <utility>
#include <vector>
#include <cstdlib>

using std::cin; using std::cout; using std::endl;
using std::string; using std::vector;
using std::pair;

class Qubit {
public:
    // We may only need the tensor product
    // I suppose it is nice to have bit and state as individual private members
    Qubit() : bit_('0'), state_('+'), tensor_(bit_, state_) {}


    // Getters, not much interesting here
    char getBit(){ return bit_; }
    char getState() { return state_; }
    pair<char, char> getTensor() { return tensor_; }

    // Setters that will help with the creation of Qubits
    // We need to make sure we change the Tensor product when we change the bit / state
    void setBit(char newBit) {
        bit_ = newBit;
        tensor_.first = bit_;
    }
    void setState(char newState) {
        state_ = newState;
        tensor_.second = state_;
    }
    // Qubits are actually vectors aka "Tensor Products"
    // So we create a pair of bit and state to imitate this Tensor
    void setTensor(char newBit, char newState) {
        if((newBit != '0' || newBit != '1') || (newState != '+' || newState != 'x'))
            return;

        setBit(newBit);
        setState(newState);

        tensor_.first = newBit;
        tensor_.second = newState;
    }

private:
    char bit_;
    char state_;
    pair<char, char> tensor_;
};

class Alice {
public:
    Alice() : n_(0), privKey_({}) {}

    // Generate a string of randomized Qubits based on user inputed size
    void generateKey(int size) {
        n_ = size;
        privKey_.resize(n_);

        for(int i = 0; i < privKey_.size(); i++) {
            privKey_[i].setBit(randBit());
            privKey_[i].setState(randState());
           
            privKey_[i].setTensor(privKey_[i].getBit(), privKey_[i].getState());
        }
    }

    // There is a 50/50 chance for each bit and state selection
    char randBit() {
        if(rand() % 2 == 0)
            return '0';
        else
            return '1';
    }
    char randState() {
        if(rand() % 2 == 0)
            return '+';
        else
            return 'x';
    }

    // Utility print function
    void printPrivKey() {
        for(int i = 0; i <  privKey_.size(); i++) {
            cout << "Qubit " << i+1  << " : "<< privKey_[i].getBit() << ' ' << privKey_[i].getState() << endl;
        }
    }

    // This is essentially a getter
    // But this is how we will "send" the private key to Bob for him to measure
    vector<Qubit> sendKey(){ return privKey_; }

private:
    int n_;    
    vector<Qubit> privKey_;
};

class Bob {
public:
    Bob() : n_(0), privKey_({}) {}

    void generateEndKey(vector<Qubit> sentPrivKey) {
        n_ = sentPrivKey.size();
        privKey_.resize(n_);

        char measureState = randState();


        for(int i = 0; i < sentPrivKey.size(); i++) {
            privKey_[i].setBit(randBit());
            privKey_[i].setState(randState());
           
            privKey_[i].setTensor(privKey_[i].getBit(), privKey_[i].getState());
        }
    }
    // There is a 50/50 chance for each bit and state selection
    char randBit() {
        if(rand() % 2 == 0)
            return '0';
        else
            return '1';
    }
    char randState() {
        if(rand() % 2 == 0)
            return '+';
        else
            return 'x';
    }


private:
    int n_;    
    vector<Qubit> privKey_;    
};

class Eve {};



int main() {
    srand(time(0));
    Alice a;
    a.generateKey(5);
    a.printPrivKey();
    return 0;
}

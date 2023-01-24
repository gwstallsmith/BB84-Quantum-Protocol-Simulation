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
    Qubit() : bit_('0'), state_('+'), tensor_(bit_, state_) {}

    char getBit(){ return bit_; }
    char getState() { return state_; }
    pair<char, char> getTensor() { return tensor_; }

    void setBit(char newBit) {
        bit_ = newBit;
    }
    void setState(char newState) {
        state_ = newState;
    }
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

    void generateKey(int size) {
        n_ = size;
        privKey_.resize(n_);

        for(int i = 0; i < privKey_.size(); i++) {
            privKey_[i].setBit(randBit());
            privKey_[i].setState(randState());
           
            privKey_[i].setTensor(privKey_[i].getBit(), privKey_[i].getState());
        }
    }

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

    void printPrivKey() {
        for(int i = 0; i <  privKey_.size(); i++) {
            cout << "Qubit " << i  << " : "<< privKey_[i].getBit() << ' ' << privKey_[i].getState() << endl;
        }
    }

private:
    int n_;    
    vector<Qubit> privKey_;
};

class Bob {};

class Eve {};



int main() {
    srand(time(0));
    Alice a;
    a.generateKey(5);
    a.printPrivKey();
    return 0;
}
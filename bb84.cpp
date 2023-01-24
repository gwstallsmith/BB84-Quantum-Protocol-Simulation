#include <iostream>
#include <string>
#include <utility>
#include <vector>

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
        if(newBit != '0' || '1')
            return;
        bit_ = newBit;
    }
    void setState(char newState) {
        if(newState != '+' || 'x')
            return;
        state_ = newState;
    }
    void setTensor(char newBit, char newState) {
        if((newBit != '0' || '1') || (newState != '+' || 'x'))
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

    vector<Qubit> generateKey(int size) {
        n_ = randN(size);
        privKey_.resize(n_);

        for(auto q : privKey_) {
            q.setTensor(randBit(), randState());
        }
    }

    int randN(int size) { return rand() % size;}

    char randBit() {
        if(rand() % 2 == 0)
            return '+';
        else
            return 'x';
    }
    char randState() {
        if(rand() % 2 == 0)
            return '0';
        else
            return '1';
    }


private:
    int n_;    
    vector<Qubit> privKey_;
};

class Bob {};

class Eve {};



int main() {


    return 0;
}
#include <iostream>
#include <string>
#include <utility>
#include <vector>

using std::cin; using std::cout; using std::endl;
using std::string; using std::vector;
using std::pair;

class Qubit {
public:
    Qubit() : bit_('0'), state_('+') {}

    char getBit(){ return bit_; }
    char getState() { return state_; }

    void setBit(char newBit) {
    }
    void setState() {}

private:
    char bit_;
    char state_;
    pair<char, char> tensor_;
};

class Alice {};

class Bob {};

class Eve {};



int main() {


    return 0;
}
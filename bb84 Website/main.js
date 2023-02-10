function main() {
    let s = new SimManager(10);
    s.runSim(1024);
    s.simResults();


    let am = new AnimManager;

    let alice = createImg('https://github.com/gwstallsmith/BB84-Quantum-Protocol-Simulation/blob/main/bb84%20Website/assets/alice.png?raw=true', 'Alice' );
    alice.position(window.innerWidth * (1/3), window.innerHeight * (1/3));

    let bob = createImg('https://github.com/gwstallsmith/BB84-Quantum-Protocol-Simulation/blob/main/bb84%20Website/assets/bob.png?raw=true', 'Bob' );
    bob.position(window.innerWidth * (2/3), window.innerHeight * (1/3));

    let eve = createImg('https://github.com/gwstallsmith/BB84-Quantum-Protocol-Simulation/blob/main/bb84%20Website/assets/eve.png?raw=true', 'Eve' );
    eve.position(window.innerWidth * (1/2), window.innerHeight * (1/3));
     
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}
  
//function draw() {
//    if (mouseIsPressed) {
//      fill(0);
//    } else {
//      fill(255);
//    }
//    ellipse(mouseX, mouseY, 80, 80);
//  }
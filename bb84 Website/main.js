function main() {
    let s = new SimManager(10);
    s.runSim(1024);
    s.simResults();
    //let am = new AnimManager();
    //let ao = new AnimObject();


}

let alice;
let bob;
let eve;

let bobBasis;
let eveBasis;

let zeroDeg;
let fortyfiveDeg;
let ninetyDeg;
let hundredthirtyfiveDeg;

let winBackground;

let x = window.innerWidth * (1/3);

let photon;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function preload() {
    alice = loadImage('alice.png');
    bob = loadImage('bob.png');
    eve = loadImage('eve.png');

    bobBasis = loadImage('+measure.png');
    eveBasis = loadImage('+measure.png');

    zeroDeg = loadImage('1+0.png');
    fortyfiveDeg = loadImage('0x45.png');
    ninetyDeg = loadImage('0+90.png');
    hundredthirtyfiveDeg = loadImage('1x135.png');

    winBackground = loadImage('background.png');

    photon = zeroDeg;
    image(photon, window.innerWidth * (1/3), window.innerHeight * (1/3), 32, 32)
    

}

function draw() {
    background(winBackground);

    x += 5;
    image(photon, x, window.innerHeight * (1/3), 32, 32)

    if((x < window.innerWidth * (1/3)) || (x > window.innerWidth * (2/3))) {
        x =  window.innerWidth * (1/3);

        if(Math.floor(Math.random() * 2) % 2 == 0) {
            photon = zeroDeg;

        } else {
            photon = fortyfiveDeg;

        }
    }

    image(alice, window.innerWidth * (1/3) - 32, window.innerHeight * (1/3));
    image(bob, window.innerWidth * (2/3) + 32, window.innerHeight * (1/3));
    image(eve, window.innerWidth * (1/2), window.innerHeight * (1/3) - 40);

    image(bobBasis, window.innerWidth * (7/12), window.innerHeight * (1/3));
    image(eveBasis, window.innerWidth * (1/2), window.innerHeight * (1/3));




}
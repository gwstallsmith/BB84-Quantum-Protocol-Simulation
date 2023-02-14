function main() {
    let s = new SimManager(10);
    s.runSim(1024);
    s.simResults();


    let am = new AnimManager;


}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

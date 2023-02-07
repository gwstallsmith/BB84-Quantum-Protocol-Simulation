import * as bb84 from "./bb84.js";

//var phot = new bb84.Photon(0, '+', 90);
let sim = new SimManger(10);
sim.runSim(100, 2);

sim.simResults();

//console.log(phot.getBit());
//console.log(phot.getBasis());
//console.log(phot.getPolar());

//document.addEventListener("DOMContentLoaded", () =>{
////  var para = document.getElementById("test");
////	var text = "The bit is: " + phot.getBit() + "\n";
////	var text = text = text +  "The basis is : " + phot.getBasis() + "\n";
////	var text = text + "The polarity is: " + phot.getPolar();
////	para.innerText = text;
//
//    sim.runSim(100, 2);
//
//    sim.simResults();
//
//});

#!/usr/bin/env node

var arduino = require('./lib/arduino');
var pins  = require('./lib/pins');

var type = process.argv[2];

if(type === undefined){
  console.error("You must specify a board type.");
  return;
}

else if(pins[type] === undefined){
  console.error(type + " is not a supported board type.");
  return;
}

// Add digital pin tests
for(var i = 0; i < pins[type].digital; i++){
  arduino.addTest(function(board){
    board.pinMode(i, five.Pin.OUTPUT);
    board.digitalWrite(i, five.Pin.HIGH);
    board.digitalWrite(i, five.Pin.LOW);
    board.pinMode(i, five.Pin.INPUT);
    return board.digitalRead(i);
  });
}

// Add analog pin tests
for(var i = 0; i < pins[type].analog; i++){
  arduino.addTest(function(board){
    // TODO: Add the analog test procedure here.
  });
}

arduino.init();
arduino.onReady(function(){
  console.log('Running tests...');
  arduino.runTests();
  console.log("Tests...." + arduino.validate());
});

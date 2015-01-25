var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){

  for(var i = 0; i < 13; i++){
    this.pinMode(i, five.Pin.HIGH);
  }

});

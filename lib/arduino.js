module.exports = (function(){

  var five = require('johnny-five');

  var digital = {
    tests:    [],
    results:  []
  };

  var analog = {
    tests:    [],
    results:  []
  };

  var board;

  return {

    init: function(){
      board = new five.Board({repl: false});
    },

    onReady: function(f){
      board.once('ready', function(){
        f(board);
      });
    },

    testsComplete: function(){
      return (digital.results.length === digital.tests.length &&
              analog.results.length === analog.tests.length );
    },

    addDigitalTest: function(pin){
      digital.tests.push(function(){
        board.pinMode(pin, five.Pin.OUTPUT);
        board.digitalWrite(pin, five.Pin.HIGH);
        board.digitalWrite(pin, five.Pin.LOW);
        board.pinMode(pin, five.Pin.INPUT);
        board.wait(100, function(){
          board.digitalRead(pin, function(v){
            digital.results.push({pin: pin, result: v});
          });
        });
      });
    },

    addAnalogTest: function(pin){
      analog.tests.push(function(){
        board.analogRead(pin, function(v){
          var val = (100 < v && v <= 1000);
          for(var i = 0; i < analog.results.length; i++){
            if(analog.results[i].pin === pin){
              return;
            }
          }
          analog.results.push({pin: pin, result: val});
        });
      });
    },

    runTests: function(){
      for(var i = 0; i < digital.tests.length; i++){
        digital.tests[i]();
      }
      for(var i = 0; i < analog.tests.length; i++){
        analog.tests[i]();
      }
    },

    validateDigital: function(){
      for(var i = 0; i < digital.results.length; i++){
        if(digital.results[i].result === 0){
          return false;
        }
      }
      return true;
    },

    validateAnalog: function(){
      for(var i = 0; i < analog.results.length; i++){
        if(!analog.results[i].result){
          return false;
        }
      }
      return true;
    },

    getFailedAnalogPins: function(){
      var pins = [];
      for(var i = 0; i < analog.results.length; i++){
        if(!analog.results[i].result){
          pins.push(analog.results[i].pin);
        }
      }
      return pins.toString();
    },

    getFailedDigitalPins: function(){
      var pins = [];
      for(var i = 0; i < digital.results.length; i++){
        if(digital.results[i].result === 0){
          pins.push(digital.results[i].pin);
        }
      }
      return pins.toString();
    }

  };

}());

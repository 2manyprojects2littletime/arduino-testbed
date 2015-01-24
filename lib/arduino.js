module.exports = (function(){

  var five  = require('johnny-five');
  var board;
  var tests = [];
  var results = [];

  return {

    /**
    * Init method to initialize the board.
    */
    init: function(){
      board = new five.Board({repl: false});
    },
    
    /**
     * onReady
     * Runs a callback when the board is ready
     * @param function
     */
    onReady: function(f){
      board.on('ready', function(){
        f(this);
      });
    },

    /**
     * addTest
     * Adds a test function to the tests array.
     * @param function
     */
    addTest: function(f){
      tests.push(f);
    },

    /**
     * runTests
     * Runs all tests in the tests array
     * @returns results[]
     */
    runTests: function(){
      for(var i = 0; i < tests.length; i++){
        results[i] = tests[i]();
      }
      return results;
    },

    /**
     * Validate
     * Returns a boolean specifying if all tests have passed.
     * @returns bool.
     */
    validate: function(){
      return (results.indexOf(1) == -1);
    }

  };

}());

/**
 * Pin Configurations for various arduino board types.
 */
module.exports = (function(){
  return {
    uno: {
      digital: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      analog:  [0, 1, 2, 3, 4, 5]
    }
  };
}());

import Ember from 'ember';
import Five from 'npm:johnny-five';

export default Ember.Controller.extend({

  setup: function(){
    Ember.Logger.log(Five);
  }.on('init')


});

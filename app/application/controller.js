import Ember from 'ember';

export default Ember.Controller.extend({
  // queryParams: ['color', 'seed', 'isGridVisible'],

  initialReset: Ember.on('init', function() {
    this.send('reset');
  }),

  actions: {
    print() {
      window.print();
    },
    reset() {
      this.setProperties({
        color: '#ec933e',
        isGridVisible: true,
        seed: 123456789,
        width: 8,
        height: 8,
        gridScale: 45
      });
    }
  }
});

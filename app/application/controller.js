import Ember from 'ember';

export default Ember.Controller.extend({
  // queryParams: ['color', 'seed', 'isEditMode'],

  seed: 246,

  selectedTool: { type: 'arrow', direction: [1, 1] },

  initialReset: Ember.on('init', function() {
    this.send('reset');
  }),

  actions: {
    print() {
      window.print();
    },
    reset() {
      let seed = this.incrementProperty('seed');

      this.setProperties({
        color: '#ec933e',
        isEditMode: true,
        seed: seed,
        width: 8,
        height: 8,
        gridScale: 45
      });
    }
  }
});

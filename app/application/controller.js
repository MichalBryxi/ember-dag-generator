import Ember from 'ember';

export default Ember.Controller.extend({
  // queryParams: ['color', 'seed', 'isEditMode'],

  selectedTool: { type: 'delete', direction: [] },

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
        isEditMode: true,
        seed: 123456789,
        width: 8,
        height: 8,
        gridScale: 45
      });
    }
  }
});

import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['color', 'seed', 'isGridVisible'],

  color: '#ec933e',
  isGridVisible: true,
  seed: 123456789,
  width: 8,
  height: 8,
  gridScale: 25,

  actions: {
    print() {
      window.print();
    }
  }
});

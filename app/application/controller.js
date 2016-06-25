import Ember from 'ember';
import url from 'ember-dag-generator/utils/url';

export default Ember.Controller.extend({
  queryParams: ['seed', 'data', 'gridScale', 'width', 'height', 'color', 'isEditMode'],

  seed: 246,
  color: '#ec933e',
  isEditMode: true,
  width: 8,
  height: 8,
  gridScale: 45,
  data: '',
  urlData: [],

  selectedTool: { type: 'arrow', direction: [1, 1] },
  hasNoUrlData: Ember.computed.notEmpty('data'),
  seedLabel: Ember.computed('hasNoUrlData', function() {
    if(this.get('hasNoUrlData')) {
      return 'Seed (disabled, explicit reset required)';
    } else {
      return 'Seed';
    }
  }),

  initialReset: Ember.on('init', function() {
    // This hack is needed, because Ember does not fill queryParams in init hook.
    // Possible bug: https://github.com/emberjs/ember.js/issues/12169

    Ember.run.scheduleOnce('afterRender', this, function() {
      let data = this.get('data');

      if(Ember.isEmpty(data)) {
        this.send('reset');
      } else {
        let dataDecoded = url.decode(this.get('data'));
        this.set('urlData', dataDecoded);
      }
    });
  }),

  actions: {
    print() {
      window.print();
    },
    reset() {
      // This is a little cheat. We don't reset the graph.
      // We just increase seed and thus create new graph.
      this.incrementProperty('seed');

      this.setProperties({
        color: '#ec933e',
        isEditMode: true,
        width: 8,
        height: 8,
        gridScale: 45,
        data: '',
        urlData: []
      });
    },
    dataUpdated(newData) {
      // We got message from graph, that user changed graph
      let string = url.encode(newData);

      // Store it in URL
      this.set('data', string);
    }
  }
});

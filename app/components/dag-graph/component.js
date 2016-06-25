import Ember from 'ember';
import { seedrandom } from 'ember-dag-generator/utils/seedrandom';
import generator from 'ember-dag-generator/utils/generator';

export default Ember.Component.extend({
  grey: '#ada',
  gap: 0.181818,
  margin: 0.3,
  domain: [0, 1],
  range: Ember.computed('gridScale', function() {
    return [0, this.get('gridScale')];
  }),
  sizeX: 10,
  sizeY: 10,
  verticesProbability: 80,
  verticesFade: 20,
  arrowProbability: 50,
  arrowFade: 10,
  arrowSize: 4,
  edgeSize: 3,
  hover: [0, 0],

  start: Ember.computed('seed', 'sizeX', 'sizeY', function() {
    let seed = this.get('seed');

    return [
      seedrandom(0, this.get('sizeX'), seed),
      seedrandom(0, this.get('sizeY'), seed+1)
    ];
  }),

  data: Ember.computed('start', 'sizeX', 'sizeY', function() {
    let data = generator.vertices(
      this.get('start'),
      this.get('seed'),
      this.get('verticesProbability'),
      this.get('edgeSize'),
      [this.get('sizeX'), this.get('sizeY')],
      this.get('verticesFade'),
      [0,0],
      this.get('arrowProbability'),
      this.get('arrowFade'),
      this.get('arrowSize')
    );
    return data;
  }),

  vertices: Ember.computed('data.[]', function() {
    return this.get('data').filterBy('type', 'vertex').map(function(elm) {
      return elm.coordinates;
    });
  }),

  edges: Ember.computed('data.[]', function() {
    return this.get('data').filterBy('type', 'edge');
  }),

  arrows: Ember.computed('data.[]', function() {
    return this.get('data').filterBy('type', 'arrow');
  }),

  actions: {
    toggleGridCell(c) {
      let tool = this.get('selectedTool');

      if(tool.type === 'delete') {
        this.get('data').forEach((elm, index) => {
          let e = elm.coordinates;

          if(e[0] === c[0] && e[1] === c[1]) {
            this.get('data').removeAt(index);
          }
        });
      } else {
        let newObject = {coordinates: c, type: tool.type, direction: tool.direction};
        this.get('data').pushObject(newObject);
      }
    },
    showToolPreview(c) {
      this.set('hover', c);
    }
  }

  // Example of data
  //
  // data: [
  //   {coordinates: [1,1], type: 'arrow', direction: [-1, 1]}
  // ]
});

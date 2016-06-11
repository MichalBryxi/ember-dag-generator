import Ember from 'ember';
import grid from 'ember-dag-generator/utils/grid';
import { seedrandom } from 'ember-dag-generator/utils/seedrandom';
import generator from 'ember-dag-generator/utils/generator';

export default Ember.Component.extend({
  grey: '#ada',
  gap: 0.181818,
  domain: [0, 10],
  range: [0, 500],
  sizeX: 10,
  sizeY: 10,
  verticesProbability: 80,
  verticesFade: 20,
  arrowProbability: 50,
  arrowFade: 10,
  arrowSize: 4,
  edgeSize: 3,

  start: Ember.computed('seed', function() {
    let seed = this.get('seed');

    return [
      seedrandom(0, this.get('sizeX'), seed),
      seedrandom(0, this.get('sizeY'), seed+1)
    ];
  }),

  data: Ember.computed('start', function() {
    return generator.vertices(
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
  }),

  vertices: Ember.computed('data.[]', function() {
    return this.get('data').filterBy('isArrow', false).map(function(elm) {
      return elm['to'];
    });
  }),

  edges: Ember.computed('data.[]', function() {
    return this.get('data').filterBy('isArrow', false).map(function(elm) {
      return [elm['from'], elm['to']];
    })
  }),

  arrows: Ember.computed('data.[]', function() {
    return this.get('data').filterBy('isArrow', true).map(function(elm) {
      return [elm['from'], elm['to']];
    })
  }),

  // Example of data
  // start: [0,0],
  //
  // vertices: [
  //   [1,1],
  //   [4,4],
  //   [1,7],
  //   [5,5],
  //   [3,5]
  // ],

  // edges: [
  //   [[0,0], [1,1]],
  //   [[1,1], [4,4]],
  //   [[4,4], [3,5]],
  //   [[3,5], [1,7]],
  //   [[4,4], [5,5]]
  // ],

  // arrows: [
  //   [[4,4], [5,3]],
  //   [[5,5], [7,7]],
  //   [[1,7], [0,8]],
  //   [[3,5], [1,3]]
  // ]
});

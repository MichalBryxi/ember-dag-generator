import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dag-vertex', 'Integration | Component | dag vertex', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dag-vertex}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dag-vertex}}
      template block text
    {{/dag-vertex}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  priority: attr('string'),
  taskParent: belongsTo('task', {inverse: 'taskChilds'}),
  taskChilds: hasMany('task', {inverse: 'taskParent'})
});

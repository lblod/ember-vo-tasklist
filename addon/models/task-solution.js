import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  status: attr('boolean'),
  task: belongsTo('task'),
  taskSolutionParent: belongsTo('task-solution', {inverse: 'taskSolutionChilds'}),
  taskSolutionChilds: hasMany('task-solution')
});

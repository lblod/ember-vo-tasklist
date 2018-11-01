import Component from '@ember/component';
import layout from '../../templates/components/tasklist-solution/edit';
import { inject as service } from '@ember/service';
import findAsync from '../../utils/find-async';
import flattenAsync from '../../utils/flatten-async';
import mapAsync from '../../utils/map-async';
import { task } from 'ember-concurrency';

export default Component.extend({
  layout,
  classNames: ['tasklist-solution'],
  store: service(),

  setTaskSolutions: task(function *(){
    let tasklist = yield this.tasklistSolution.tasklist;
    let topLevelTasks = yield tasklist.tasks;
    topLevelTasks = topLevelTasks.toArray().sort((a,b)=> a.priority - b.priority);
    this.set('tasks', topLevelTasks);
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this.setTaskSolutions.perform();
    //TODO: remove unused task-solution
  }
});

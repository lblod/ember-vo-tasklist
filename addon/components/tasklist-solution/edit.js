import Component from '@ember/component';
import layout from '../../templates/components/tasklist-solution/edit';
import { task } from 'ember-concurrency';

export default Component.extend({
  layout,
  classNames: ['tasklist-solution'],

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

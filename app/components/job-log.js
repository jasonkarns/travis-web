import Ember from 'ember';

export default Ember.Component.extend({
  logBinding: 'job.log',

  didReceiveAttrs: function(options) {
    this._super(...arguments);

    if(options.oldAttrs && options.oldAttrs.job) {
      this.teardownLog(options.oldAttrs.job.value);
    }

    if(options.newAttrs && options.newAttrs.job) {
      this.setupLog(options.newAttrs.job.value);
    }
  },

  teardownLog(job) {
    job.unsubscribe();
  },

  setupLog(job) {
    job.get('log').fetch();
    job.subscribe();
  }
});

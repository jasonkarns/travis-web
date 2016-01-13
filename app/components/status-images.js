import Ember from 'ember';
import { format as formatStatusImage } from 'travis/utils/status-image-formats';

export default Ember.Component.extend({
  popup: Ember.inject.service(),

  id: 'status-images',
  attributeBindings: ['id'],
  classNames: ['popup', 'status-images'],
  formats: ['Image URL', 'Markdown', 'Textile', 'Rdoc', 'AsciiDoc', 'RST', 'Pod', 'CCTray'],

  branches: function() {
    let branches = this.get('repo.branches');

    if(branches.get('length')) {
      return branches.map(function(branch) {
        return branch.get('commit.branch');
      });;
    } else {
      return ['master'];
    }
  }.property('repo.branches.[]'),

  branchesAreLoaded: Ember.computed.alias('repo.branches.isLoaded'),

  actions: {
    close() {
      return this.get('popup').close();
    }
  },

  statusString: function() {
    let format = this.get('format') || this.get('formats.firstObject'),
        branch = this.get('branch') || 'master';

    return formatStatusImage(format, this.get('repo.slug'), branch);
  }.property('format', 'repo.slug', 'branch')
});

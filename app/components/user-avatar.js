import Ember from 'ember';
import config from 'travis/config/environment';


export default Ember.Component.extend({

    tagName: 'span',
    classNames: ['avatar'],
    classNameBindings: ['hasGravatar:has-image'],
    attributeBindings: ['userInitials:data-initials'],

    hasGravatar: function() {
        return this.get('user.gravatarId');
    },

    gravatarUrl: function() {
      return location.protocol + "//secure.gravatar.com/avatar/" + (this.get('user.gravatarId')) + "?s=36&d=mm";
    }.property('gravatarUrl'),

    userInitials: function() {
        var name = this.get('user.name') || this.get('user.login');
        var arr = name.split(' ');
        var initials;

        if (arr.length >= 2) {
            initials = arr[0].split('')[0] + arr[1].split('')[0];
        } else {
            initials = arr[0].split('')[0];
        }
        return initials;
    }.property('userInitials')

});

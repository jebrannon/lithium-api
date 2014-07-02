define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {
    var Profile = Backbone.Model.extend({
      defaults: {
        urlRoot: "http://community.eu.playstation.com/restapi/vc/users/id/"
      },
      initialize: function() {
        this.url = this.get('urlRoot') + this.get('id') + "/?xslt=json.xsl&callback=?"
      },
      parse: function(resp, xhr) {
        var user = resp.response.user;
        var lastVisit = new Date(user.last_visit_time.$).getTime();
        var now = new Date().getTime();
        var difference = now - lastVisit;

        //  Convert last activity time
        user.activity = {}
        user.activity.days = Math.round(difference/86400000);
        user.activity.hours = Math.round(difference/3600000);
        user.activity.minutes = Math.round(difference/60000);
        
        return user;
      }
    });
    return Profile;
  });
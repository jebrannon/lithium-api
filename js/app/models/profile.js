define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {
    var Profile = Backbone.Model.extend({
      defaults: {
        BaseUrl: "http://community.eu.playstation.com/restapi/vc/users/id/"
      },
      initialize: function() {
        this.url = this.attributes.BaseUrl + this.id + "/?xslt=json.xsl"
        console.log('initialize', this.url);
      },
      parse: function(resp, xhr) {
        var user = resp.response.user;
        var lastVisit = new Date(user.last_visit_time.$).getTime();
        var now = new Date().getTime();
        var difference = now - lastVisit;
        var imageId = user.profiles.profile[1].$.match(/image-id\/([A-Za-z0-9]+)/g)[0];


        user.activity = {}
        user.activity.days = Math.round(difference/86400000);
        user.activity.hours = Math.round(difference/3600000);
        user.activity.minutes = Math.round(difference/60000);

        user.avatar = 'http://community.lithium.com/t5/image/serverpage/' + imageId + '/image-dimensions/128x72';

        return user;
      }
    });
    return Profile;
  });
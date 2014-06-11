define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {
    var Profile = Backbone.Model.extend({
      defaults: {
        BaseUrl: "http://community.lithium.com/restapi/vc/users/id/"
      },
      initialize: function() {
        this.url = this.attributes.BaseUrl + this.id
        console.log('initialize', this.attributes.BaseUrl);

        // if (this.has("PageUrl")) {
        //   var pageShortName = this.get("PageUrl").split("/")[1];
        //   this.url = Config.justgiving.url + Config.justgiving.apiKey + "/v1/fundraising/pages/" + pageShortName;
        // } 
      }
    });
    return Profile;
  });
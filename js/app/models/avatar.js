define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {
    var Avatar = Backbone.Model.extend({
      defaults: {
        urlRoot: "http://community.eu.playstation.com/restapi/vc/users/id/"
      },
      initialize: function() {
        this.url = this.get('urlRoot') + this.get('id') + "/profiles/avatar?xslt=json.xsl&callback=?";
      },
      sync: function(method, model, options) {
        var params = _.extend({
          type: 'GET',
          dataType: 'jsonp',
          url: this.url,
          processData: false
        }, options);
        return $.ajax(params);
      },
      parse: function(resp, xhr) {
        var image = resp.response.image;
        return image;
      }
    });
    return Avatar;
  });
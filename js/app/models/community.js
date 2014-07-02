define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {
    var Community = Backbone.Model.extend({
      initialize: function() {
        this.url = "http://community.eu.playstation.com/restapi/vc?xslt=json.xsl&callback=?";
      },
      parse: function(resp, xhr) {
        var o = {};
        o['id'] = resp.response.community.id.$;
        o['title'] = resp.response.community.title.$;
        return o;
      },
    });
    return Community;
  });
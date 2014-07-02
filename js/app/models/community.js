define([
  'jquery',
  'underscore',
  'backbone',
  'app/config',
  ], function($, _, Backbone, Config) {
    var Community = Backbone.Model.extend({
      initialize: function() {
        this.url = Config.urlRoot + "?xslt=json.xsl&callback=?";
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
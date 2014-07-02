define([
  'jquery',
  'underscore',
  'backbone',
  'app/config',
  'app/models/category',
  ], function($, _, Backbone, Config, CategoryModel) {
    var Categories = Backbone.Collection.extend({
      model: CategoryModel,
      initialize: function () {
        this.url = Config.urlRoot + '/categories/id/' + Config.community + "/categories?xslt=json.xsl&callback=?";
      },
      parse: function (resp, xhr) {
        var that = this;
        var categories = resp.response.categories.category;
        var results = [];

        //  Format data to work with Backbone
        $(categories).each(function (category) {
          results.push(that.formatDataToFit(this));
        });
        return results;
      },
      formatDataToFit: function (data) {
        var o = {};
        o['id'] = data.id.$;
        o['title'] = data.title.$;
        return o;
      }
    });
    
    return Categories;
  });
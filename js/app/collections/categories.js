define([
  'jquery',
  'underscore',
  'backbone',
  'app/models/category',
  ], function($, _, Backbone, CategoryModel) {
    var Categories = Backbone.Collection.extend({
      model: CategoryModel,
      comparator: 'views',
      urlRoot: 'http://community.eu.playstation.com/restapi/vc',
      query: '/search/messages?q=is_root:true&sort_by=-replies&rangeTime=1M&restapi.response_style=view&restapi.format_detail=full_list_element&page_size=10&xslt=json.xsl',
      initialize: function(user) {
        this.url = this.urlRoot + '/categories/id/55' + "/categories?xslt=json.xsl&callback=?";
      },
      parse: function(resp, xhr) {
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
        o['feed'] = this.urlRoot + data.href + this.query + '&callback=?';
        o['title'] = data.title.$;
        return o;
      }
    });
    
    return Categories;
  });
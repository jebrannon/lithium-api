define([
  'jquery',
  'underscore',
  'backbone',
  'app/models/board',
  ], function($, _, Backbone, BoardModel) {
    var Boards = Backbone.Collection.extend({
      model: BoardModel,
      comparator: 'views',
      urlRoot: 'http://community.eu.playstation.com/restapi/vc',
      query: '/posts/recent?page_size=10&restapi.response_style=view&restapi.format_detail=full_list_element&xslt=json.xsl',
      request: function(id) {
        this.url = this.urlRoot + "/categories/id/" + id + "/?xslt=json.xsl&callback=?";
      },
      parse: function(resp, xhr) {
        var that = this;
        var boards = resp.response.category.boards.board;
        var results = [];

        //  Format data to work with Backbone
        $(boards).each(function (board) {
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
    
    return Boards;
  });
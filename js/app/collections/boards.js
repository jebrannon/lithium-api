define([
  'jquery',
  'underscore',
  'backbone',
  'app/config',
  'app/models/board',
  ], function($, _, Backbone, Config, BoardModel) {
    var Boards = Backbone.Collection.extend({
      model: BoardModel,
      catId: false,
      request: function(id) {
        this.catId = id;
        this.url = Config.urlRoot + "/categories/id/" + this.catId + "/?xslt=json.xsl&callback=?";
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
        o['catId'] = this.catId;
        o['title'] = data.title.$;
        return o;
      }
    });
    
    return Boards;
  });
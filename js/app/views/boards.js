define([
  'jquery',
  'underscore',
  'backbone',
  'app/views/posts',
  'app/collections/boards',
  'text!html/profile/boards.html',
  ], function($, _, Backbone, PostsView, BoardsCollection, BoardsTemplate) {
    var boardsView = Backbone.View.extend({
      el: '#aside',
      catId: false,
      rendered: false,
      initialize: function() {
        this._BOARDS = new BoardsCollection();
      },
      render: function(id) {
        var that = this;

        //  Only reprint Board list if category has chnaged
        if (this.catId !== id) {
          this.catId = id;
          this._BOARDS.request(id);
          this._BOARDS.fetch ({
            success: function () {
              that.output();
            }
          });
        }
      },
      output: function () {
        $(this.el).empty();
        $(this.el).append(_.template(BoardsTemplate, {boards: this._BOARDS.models}));
        //  Template ready event
        if (!this.rendered) {
          this.trigger("ready");
          this.rendered = true;
        }
      },
      setBoard: function (id) {
        var anchors = $(this.el).find('.boards-list a');

        //  Adjust menu
        anchors.removeClass('selected');
        if (id) {
          $(this.el).find('#' + id).addClass('selected');
        }
      }
    });
    return new boardsView;
  });
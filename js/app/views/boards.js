define([
  'jquery',
  'underscore',
  'backbone',
  'app/views/posts',
  'app/collections/boards',
  'text!html/profile/boards.html',
  ], function($, _, Backbone, PostsView, BoardsCollection, BoardsTemplate) {
    var boardsView = Backbone.View.extend({
      el: '#profile',
      events: {
        "click": "open"
      },
      initialize: function() {

      },
      render: function(id) {
        var that = this;
        this._BOARDS = new BoardsCollection();
        this._BOARDS.request(id);
        this._BOARDS.fetch ({
          success: function () {
            that.output();
          }
        });
      },
      open: function (event) {
        var nodeName = event.target.nodeName.toLowerCase();
        if (nodeName === 'a') {
          console.log(event.target);
          var anchors = $(this.el).find('.boards-list a');

          //  Adjust list
          anchors.removeClass('selected');
          $(event.target).addClass('selected');

          PostsView.render({url: event.target.href});
          event.preventDefault();
        }
      },
      output: function () {
        $(this.el).empty();
        $(this.el).append(_.template(BoardsTemplate, {boards: this._BOARDS.models}));
      }
    });
    return new boardsView;
  });
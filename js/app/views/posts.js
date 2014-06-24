define([
  'jquery',
  'underscore',
  'backbone',
  'app/collections/posts',
  'text!html/posts/list.html',
  ], function($, _, Backbone, PostsCollection, PostsTemplate) {
    var postsView = Backbone.View.extend({
      el: '#posts',
      events: {
        "click": "open"
      },
      render: function (user) {
        var that = this;
        this._POSTS = new PostsCollection(user);
        this._POSTS.fetch ({
          success: function () {
            that.lookupAssociatedImages();
          }
        });
      },
      lookupAssociatedImages: function () {
        var that = this;
        var len = 0;
        var total = this._POSTS.length;
        this._POSTS.each(function(post) {
          post.fetch({
            success: function () {
                len++;
                if (len === total) {
                  that.output();
                }
              }
          });
        });
      },
      output: function () {
        $(this.el).find('.loading').hide();
        $(this.el).append(_.template(PostsTemplate, {posts: this._POSTS.models}));
      }
    });
    return new postsView;
  });
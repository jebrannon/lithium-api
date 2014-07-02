define([
  'jquery',
  'underscore',
  'backbone',
  'app/collections/posts',
  'text!html/posts/list.html',
  ], function($, _, Backbone, PostsCollection, PostsTemplate) {
    var postsView = Backbone.View.extend({
      el: '#posts',
      render: function (vars) {
        var that = this;
        this.reset();
        this._POSTS = new PostsCollection(vars);
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
      },
      reset: function () {
        $(this.el).find('.loading').show();
        $(this.el).find('.post-list').remove();
      }
    });
    return new postsView;
  });
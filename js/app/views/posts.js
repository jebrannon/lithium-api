define([
  'jquery',
  'underscore',
  'backbone',
  'app/config',
  'app/collections/posts',
  'text!html/posts/list.html',
  ], function($, _, Backbone, Config, PostsCollection, PostsTemplate) {
    var postsView = Backbone.View.extend({
      el: '#posts',
      initialize: function () {
        this._POSTS = new PostsCollection();
      },
      render: function (o) {
        var that = this;
        this.reset();

        if (!o) {
          this._POSTS.setUrl(Config.urlRoot + Config.query + Config.limit + '&xslt=json.xsl&callback=?');
        }
        else if (o.category) {
          this._POSTS.setUrl(Config.urlRoot + 'categories/id/' + o.category + '/' + Config.query + Config.limit + '&xslt=json.xsl&callback=?');
        }
        else if (o.board) {
          this._POSTS.setUrl(Config.urlRoot + 'boards/id/' + o.board + '/' + Config.query + Config.limit + '&xslt=json.xsl&callback=?');
        }


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
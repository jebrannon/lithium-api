define([
  'jquery',
  'underscore',
  'backbone',
  'app/views/posts',
  'app/views/boards',
  'app/models/community',
  'app/collections/categories',
  'text!html/header/identity.html',
  'text!html/header/menu.html',
  ], function($, _, Backbone, PostsView, BoardsView, CommunityModel, CategoriesCollection, IdentityTemplate, MenuTemplate) {
    var headerView = Backbone.View.extend({
      el: '#header',
      rendered: false,
      initialize: function() {
        this._TOTAL_REQUEST = 2;
        this._REQUESTS_COMPLETE = 0;
        this._COMMUNITY = new CommunityModel();
        this._CATEGORIES = new CategoriesCollection();
      },
      render: function (classes) {
        var that = this;

        //  Update body class
        document.body.className = classes;

        //  Load Community data (if not already loaded)
        if (!this._COMMUNITY.get('id')) {
          this._COMMUNITY.fetch ({
            success: function () {
              that.output();
            }
          });
        };

        //  Load Categories (if not already loaded)
        if (!this._CATEGORIES.models.length) {
          this._CATEGORIES.fetch ({
            success: function () {
              that.output();
            }
          });
        };
      },
      output: function () {
        this._REQUESTS_COMPLETE++;
        if (this._REQUESTS_COMPLETE === this._TOTAL_REQUEST) {
          $(this.el).append(_.template(IdentityTemplate, {community: this._COMMUNITY}));
          $(this.el).append(_.template(MenuTemplate, {categories: this._CATEGORIES.models}));

          //  Template ready event
          if (!this.rendered) {
            this.trigger("ready");
            this.rendered = true;
          }
        }
      },
      setCategory: function (id) {
        var anchors = $(this.el).find('.menu a');

        //  Adjust menu
        anchors.removeClass('selected');
        if (id) {
          $(this.el).find('#' + id).addClass('selected');
        }
      }
    });
    return new headerView;
  });
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
      events: {
        "click": "open"
      },
      initialize: function() {
        this._TOTAL_REQUEST = 2;
        this._REQUESTS_COMPLETE = 0;
      },
      render: function (user) {
        var that = this;
        this._COMMUNITY = new CommunityModel();
        this._COMMUNITY.fetch ({
          success: function () {
            that.output();
          }
        });
        this._CATEGORIES = new CategoriesCollection();
        this._CATEGORIES.fetch ({
          success: function () {
            that.output();
          }
        });
      },
      open: function (event) {
        var nodeName = event.target.nodeName.toLowerCase();
        if (nodeName === 'a') {
          var select = event.target.getAttribute('data-app-select');
          var anchors = $(this.el).find('.menu a');

          //  Adjust menu
          anchors.removeClass('selected');
          $(event.target).addClass('selected');

          //  Functionality
          switch (select) {
            case 'category':
              PostsView.render({url: event.target.href});
              document.body.className = 'red-theme';
              BoardsView.render(event.target.id);

              break;
            case 'users':
              document.body.className = 'blue-theme';
              break;
          }
          event.preventDefault();
        }
      },
      output: function () {
        this._REQUESTS_COMPLETE++;
        if (this._REQUESTS_COMPLETE === this._TOTAL_REQUEST) {
          $(this.el).append(_.template(IdentityTemplate, {community: this._COMMUNITY}));
          $(this.el).append(_.template(MenuTemplate, {categories: this._CATEGORIES.models}));
        }
      }
    });
    return new headerView;
  });
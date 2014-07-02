define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {
    var Category = Backbone.Model.extend({
      defaults: {
        feed: null
      }
    });
    return Category;
  });
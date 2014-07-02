define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {
    var Board = Backbone.Model.extend({
      defaults: {
        feed: null
      }
    });
    return Board;
  });
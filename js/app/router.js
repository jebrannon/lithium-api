define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/profile',
	],
	function($, _, Backbone, Profile) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				'*actions': 'index'
			},
			index: function() {
				Profile.render();
			}
		});
		var init = function() {
			var app_router = new AppRouter;
			Backbone.history.start();
		};
		return {
			init: init
	 	}
	});
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
				Profile.render('54222');
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
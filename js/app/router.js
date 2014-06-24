define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/profile',
	'app/views/posts',
	],
	function($, _, Backbone, Profile, Posts) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				'*actions': 'index'
			},
			index: function() {
				Profile.render('225950');
				Posts.render('225950');
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
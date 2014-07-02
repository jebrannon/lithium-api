define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/header',
	'app/views/profile',
	'app/views/posts',
	],
	function($, _, Backbone, Header, Profile, Posts) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				'*actions': 'index'
			},
			index: function() {
				Header.render();
				Profile.render('225950');
				Posts.render({user: '225950'});
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
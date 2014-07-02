define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/header',
	'app/views/authors',
	'app/views/posts',
	'app/views/boards',
	],
	function($, _, Backbone, Header, Authors, Posts, Boards) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				'': 'index',
				'category(/:catId)': 'category',
				'category/:catId/board/:boardId': 'board',
				'author(/:authorId)': 'author'
			},
			index: function () {
				Header.render('index blue-theme');
				Header.setCategory();
				Posts.render();
			},
			category: function (id) {
				Header.render('red-theme');
				if (!Header.rendered) {
					Header.on("ready", function() {
						Header.setCategory(id);
					});
				}
				else {
					Header.setCategory(id);
				}
				Posts.render({category: id});
				Boards.render(id);
			},
			board: function (catId, boardId) {
				Header.render('green-theme');
				if (!Header.rendered) {
					Header.on("ready", function() {
						Header.setCategory(catId);
					});
				}
				else {
					Header.setCategory(catId);
				}
				Posts.render({board: boardId});
				Boards.render(catId);
				if (!Boards.rendered) {
					Boards.on("ready", function() {
						Boards.setBoard(boardId);
					});
				}
				else {
					Boards.setBoard(boardId);
				}
			},
			author: function (authorId) {
				console.log('author', authorId)
				Header.render('blue-theme');
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
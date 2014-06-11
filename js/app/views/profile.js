define([
	'jquery',
	'underscore',
	'backbone',
	'app/models/profile',
	'text!html/profile/details.html',
	], function($, _, Backbone, Profile, ProfileTemplate) {
		var pledgeView = Backbone.View.extend({
			el: '#pledges',
			events: {
				"click": "open"
			},
			initialize: function() {

				this.mymodel = new Profile({id: '9048'});
				this.mymodel.fetch ({
					success: function () {
						console.log('success')
					}
				})

				// var charityId = Config.justgiving.charityId;
				// var eventId = Config.justgiving.eventId;
				// var limit = Config.justgiving.limit;
				// this.pages = new PagesCollection(charityId, eventId, limit);
			},
			// render: function() {
			// 	var that = this;
			// 	this.pages.fetch({
			// 		success: function () {
			// 			var total = that.pages.length;
			// 			var i = 0;
			// 			that.pages.each(function(page) {
			// 				page.fetch({
			// 					success: function () {
			// 						i++;
			// 						if (i === total) {
			// 							that.output();
			// 						}
			// 					}
			// 				});
			// 			})
			// 		}
			// 	});
			// },
			// open: function(e) {
			// 	if (e.target && e.target.getAttribute('data-app-cid')) {
			// 		var that = this;
			// 		var cid = e.target.getAttribute('data-app-cid');
			// 		var model = this.pages.get(cid);
			// 		this.expand(model);
			// 	}
			// },
			// output: function() {
			// 	$('#loading').hide();
			// 	$(this.el).append(_.template(ItemTemplate, {pledges: this.pages.models}));
			// },
			// expand: function(model) {
			// 	if ($('#pledgePage').length > 0) {
			// 		$('#pledgePage').remove();
			// 	}
			// 	$(this.el).prepend(_.template(PageTemplate, {pledge: model}));
			// }
		});
		
		return new pledgeView;
	});
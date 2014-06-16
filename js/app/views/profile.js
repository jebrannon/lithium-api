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
				this.profile = new Profile({id: '2908093'});
			},
			render: function() {
				var that = this;
				this.profile.fetch ({
					success: function (e) {
						that.output();
					}
				});
			},
			output: function() {
				$('#loading').hide();
				$(this.el).append(_.template(ProfileTemplate, {profile: this.profile}));
			}
		});
		
		return new pledgeView;
	});
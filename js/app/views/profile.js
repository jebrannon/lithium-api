define([
	'jquery',
	'underscore',
	'backbone',
	'app/models/details',
	'app/models/avatar',
	'app/models/kudos',
	'text!html/profile/details.html',
	'text!html/profile/avatar.html',
	'text!html/profile/kudos.html',
	], function($, _, Backbone, Details, Avatar, Kudos, DetailsTemplate, AvatarTemplate, KudosTemplate) {
		var profileView = Backbone.View.extend({
			el: '#profile',
			events: {
				"click": "open"
			},
			initialize: function() {
				this._TOTAL_REQUEST = 3;
				this._REQUESTS_COMPLETE = 0;
			},
			render: function(user) {
				var that = this;

				//  Avatar image
				this._AVATAR = new Avatar({id: user});
				this._AVATAR.fetch ({
					success: function () { that.dataHasLoaded() }
				});

				//  Profile details
				this._DETAILS = new Details({id: user});
				this._DETAILS.fetch ({
					success: function () { that.dataHasLoaded() }
				});

				//  User 'kudos' rating
				this._KUDOS = new Kudos({id: user});
				this._KUDOS.fetch ({
					success: function () { that.dataHasLoaded() }
				});
			},
			dataHasLoaded: function () {
				this._REQUESTS_COMPLETE++;
				if (this._REQUESTS_COMPLETE === this._TOTAL_REQUEST) {
					this.output();
				}
			},
			output: function () {
				$('#loading').hide();
				$(this.el).append(_.template(AvatarTemplate, {avatar: this._AVATAR}));
				$(this.el).append(_.template(DetailsTemplate, {details: this._DETAILS}));
				$(this.el).append(_.template(KudosTemplate, {kudos: this._KUDOS}));
			}
		});
		return new profileView;
	});
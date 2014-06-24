define([
	'jquery',
	'underscore',
	'backbone',
	'app/models/post',
	], function($, _, Backbone, PostModel) {
		var Posts = Backbone.Collection.extend({
			model: PostModel,
			comparator: 'views',
			urlRoot: 'http://community.eu.playstation.com/restapi/vc/search/messages?q=is_root:true&sort_by=-replies&rangeTime=1M&restapi.response_style=view&restapi.format_detail=full_list_element&author_id=',
			initialize: function(user) {
				this.url = this.urlRoot + user + "&xslt=json.xsl&callback=?";
			},
	    parse: function(resp, xhr) {
	    	var that = this;
	    	var messages = resp.response.messages.message;
	    	var results = [];

	    	//  Format data to work with Backbone
	    	$(messages).each(function (message) {
	    		results.push(that.formatDataToFit(this));
	    	})
				return results;
	    },
	    formatDataToFit: function (data) {
	    	var o = {};
	    	o['id'] = data.id.$;
	    	o['href'] = data.view_href;
	    	o['kudos'] = data.kudos.count.$;
	    	o['views'] = data.views.count.$;
	    	o['posted'] = new Date(data.post_time.$).toDateString();
	    	o['subject'] = data.subject.$;
	    	return o;
	    }
		});
		
		return Posts;
	});
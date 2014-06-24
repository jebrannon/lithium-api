define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {
    var Post = Backbone.Model.extend({
      defaults: {
        urlRoot: 'http://community.eu.playstation.com/restapi/vc/messages/id/',
        image: null,
        href: null
      },
      initialize: function() {
        this.url = this.get('urlRoot') + this.get('id') + '/images?xslt=json.xsl&callback=?';
      },
      parse: function (resp) {

        //  Images
        if (!resp.id) {
          return {image: this.getImageUrl(resp.response.images)};
        }
        else {
          return resp;
        }
      },
      getImageUrl: function (images) {
        if (images) {
          return images.image.length ? images.image[0].url.$ : images.image.url.$;
        }
        else {
          return null;
        }
      }
    });
    return Post;
  });
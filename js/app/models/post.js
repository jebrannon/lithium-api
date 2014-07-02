define([
  'jquery',
  'underscore',
  'backbone',
  'app/config',
  ], function($, _, Backbone, Config) {
    var Post = Backbone.Model.extend({
      defaults: {
        image: null,
        href: null
      },
      initialize: function() {
        this.url = Config.urlRoot + 'messages/id/' + this.get('id') + '/images?xslt=json.xsl&callback=?';
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
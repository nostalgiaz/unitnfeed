$(function () {
  var Feed = Backbone.Model.extend({
    default: {
      "text": ""
    }
  });

  var Feeds = Backbone.Collection.extend({
    model: Feed,
    url: null,
    initialize: function () {
      var self = this;

      $.get("example-xml/scienze.xml").done(function (xml) {
        $(xml).find('text').each(function () {
          self.add({'text': $(this).text()});
        });
        window.unitnfeed.trigger('ready')
      });
    }
  });

  var FeedView = Backbone.View.extend({
    className: "row-fluid",
    template: _.template($("#feed-template").html()),

    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  FeedsView = Backbone.View.extend({
    initialize: function () {
      this.on('ready', this.render)
    },
    render: function () {
      window.feeds.each(function (feed) {
        $('#feedslist').append(new FeedView({model: feed}).render().el);
      }, this);
      return this;
    }
  });

  window.unitnfeed = new FeedsView();
  window.feeds = new Feeds();
});
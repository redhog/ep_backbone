define([
  "backbone",
  "underscore",
  "backbone-socketio-client",
], function (
  Backbone,
  _,
  BackboneSocketio
) {
  return {
    documentReadyBackbone: function (hook, args, cb) {
      var socket,
        loc = document.location,
        port = loc.port == "" ? (loc.protocol == "https:" ? 443 : 80) : loc.port,
        url = loc.protocol + "//" + loc.hostname + ":" + port,
      socket = io.connect(url);

      var backboneMixins = new BackboneSocketio(socket),
        SocketModel = Backbone.Model.extend(backboneMixins.mixins.model),
        SocketCollection = Backbone.Collection.extend(backboneMixins.mixins.collection),
        MyModel;

      MyModel = SocketModel.extend({
          // normal model init code here
          initialize: function () {
              // if you need an initialize method make sure you call the parent's
              // initialize function
              MyModel.__super__.initialize.call(this);
          }
      });

      var MyCollection = SocketCollection.extend({
        model: MyModel,
        initialize: function () {
          MyCollection.__super__.initialize.call(this);
        }
      });

      var c = new MyCollection([], {id:'ccc'});
      c.on('add', function(model, collection, options) {
        console.log("ADD", collection.cid +":" + collection.id, model.cid + ":" + model.id);
        model.on('change:value', function(model, value) {
          console.log("VALUE CHANGED", collection.cid +":" + collection.id, model.cid + ":" + model.id, value);
        });
      });
      x = new MyModel({id: 'xxx'});
      c.add(x);

      x.set({value: 13});

    }
  }
});

var Backbone = require("backbone");
var BackboneSocketio = require("backbone-socketio/client/backbone-socketio-client");
var BackboneSocketioServer = require("backbone-socketio/src/backbone-socketio");



exports.socketio = function (hook_name, args, cb) {
  BackboneSocketioServer.init(args.io.sockets);

  exports.backboneMixins = new BackboneSocketio(args.io.sockets);
  exports.SocketModel = Backbone.Model.extend(exports.backboneMixins.mixins.model);
  exports.SocketCollection = Backbone.Collection.extend(exports.backboneMixins.mixins.collection);

  var MyModel = exports.SocketModel.extend({
    initialize: function () {
      MyModel.__super__.initialize.call(this);
    }
  });

  var MyCollection = exports.SocketCollection.extend({
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
};

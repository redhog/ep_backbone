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

  x = new MyModel({id: 'xxx'});

  x.on('change:value', function(model, value) {
    console.log("VALUE CHANGED", value);
  });

  x.set({value: 4711});
};

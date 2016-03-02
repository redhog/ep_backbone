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
        url = loc.protocol + "//" + loc.hostname + ":" + port + "/",
        pathComponents = location.pathname.split('/'),
        // Strip admin/plugins
        baseURL = url + pathComponents.slice(0,pathComponents.length-2).join('/') + '/',
        resource = baseURL + "socket.io";
      socket = io.connect(resource);

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


      x = new MyModel();

      x.on('change:value', function(model, value) {
        console.log("VALUE CHANGED", value);
      });

      x.set({value: 13});
    }
  }
});

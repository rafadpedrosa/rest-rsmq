// Generated by CoffeeScript 1.6.2
(function() {
  var PORT, app, server;
  var httpp = require('http');
  PORT = 8101;

  app = require("./app");

  app.set('view engine', 'html');

  httpp.createServer(app).listen(PORT, function(){
    console.log('Express Server escutando na porta ' + PORT);
  });

}).call(this);

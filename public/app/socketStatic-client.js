(function(global, document) {

  var socket = io.connect('http://localhost:3344/static');
  var head = document.getElementsByTagName('head')[0];
  var counter = 0;
  var requestStack = {};

  socket.on('receive:file', function (data) {
    requestStack[data.index](data);
    delete requestStack[data.index];
  });

  // --- App
  var socketStatic = global.socketStatic || {};

  socketStatic.request = function (filePath, callback) {
    counter++;
    requestStack[counter] = callback;
    socket.emit('request:file', { index: counter, path: filePath });
  };

  global.socketStatic = socketStatic;

})(window, document);
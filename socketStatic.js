var fs = require('fs');
var path = require('path');
var socket = require('socket.io');
var Q = require('Q');
var io;
var pubDir = '';
var isdev = true;

// Function Helpters
function lg(msg) {
  if (isdev) console.log('---:: ' + msg);
}

function getFileContents(filePath) {
  var deferred = Q.defer();
  filePath = path.join(__dirname, pubDir, filePath);
  fs.readFile(filePath, 'utf8', function(error, contents) {
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(contents);
    }
  });
  return deferred.promise;
}

function readBatchFiles(array) {
  var deferred = Q.defer();
  Q.all(array.map(getFileContents)).then(function(values) {
    var obj = {}
    values.forEach(function(fileContent, index) {
      obj[array[index]] = fileContent;
    });
    deferred.resolve(obj);
  });
  return deferred.promise;
}

function readFilesFromDir(dirPath) {
  lg('readFilesFromDir: ' + dirPath);
  var deferred = Q.defer();
  var appendFolderName = function(fileName) {
    return dirPath + '/' + fileName;
  };
  fs.readdir(path.join(__dirname, pubDir, dirPath), function(error, files) {
    if (error) throw err;
    if (files) {
      Q.all(
        files
        .map(appendFolderName)
        .map(getFileContents))
      .then(function(values) {
        var obj = {}
        values.forEach(function(fileContent, index) {
          obj[files[index]] = fileContent;
        });
        deferred.resolve(obj);
      });
    }
  });
  return deferred.promise;
}

function isFile(path) {
  return fs.existsSync(path) && fs.lstatSync(path).isFile();
}

function isDir(path) {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}

function processRequest(data, socket) {
  var type = Object.prototype.toString.call(data.path).slice(8, -1).toLowerCase();

  if (type === "array") {
    Q.when(readBatchFiles(data.path)).then(function (obj) {
      return socket.emit('receive:file', {index: data.index, contents: obj});
    });
  } else {
    var filePath = path.join(__dirname, pubDir, data.path);
    if (type === "string" && isFile(filePath)) {
      Q.when(getFileContents(data.path)).then(function (contents) {
        return socket.emit('receive:file', {index: data.index, contents: contents});
      });
    }

    if (type === "string" && isDir(filePath)) {
      Q.when(readFilesFromDir(data.path)).then(function (obj) {
        return socket.emit('receive:file', {index: data.index, contents: obj});
      });
    }
  }

  return null;
}

function initialize(server, publicDir) {
  pubDir = publicDir;
  io = socket.listen(server);
  io.of('/static')
    .on('connection', function (socket) {
      socket.on('request:file', function (data) {
        lg('requested: ' + data.path);
        processRequest(data, socket);
      });
    });
}

module.exports = {
	init: initialize
};
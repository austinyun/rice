var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    router = require('choreographer').router();

module.exports = function rice() {

  router.notFound( function(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Error 404: ' + req.url + ' not found.');

  });

  return http.createServer(router);
}

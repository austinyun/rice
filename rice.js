var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    maple = require('mapleTree'),
    router = new maple.RouteTree();

function rice() {

  // TODO configure router
  router.define('/', function (req, res) {});


  return http.createServer(function (req, res) {
    // TODO should be router.match() something I think
  }).listen(8080);

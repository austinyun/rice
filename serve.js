var lactate = require("lactate"),
    oppressor = require("oppressor");

module.exports = {
    "robots": function(req, res) {
        lactate.file("public/robots.txt", req, res);
    },

    "favicon": function(req, res) {
        lactate.file("public/images/favicon.ico", req, res);
    },

    "staticFile": lactate.file,

    "serve": function(req, res, data) {
        var s = oppressor(req);
        s.end(data);
        s.pipe(res);
    }
};

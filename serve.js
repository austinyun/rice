var lactate = require("lactate");

module.exports = {
    "robots": function(req, res) {
        lactate.serve("public/robots.txt", req, res);
    },

    "favicon": function(req, res) {
        lactate.serve("public/images/favicon.ico", req, res);
    },

    "staticFile": lactate.file,

    "serve": function(res, data) {
        // TODO: handle headers better
        res.end(data);
    }
};

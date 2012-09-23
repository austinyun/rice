var lactate = require("lactate"), // static file server
    oppressor = require("oppressor"); // streaming compression module

module.exports = {
    "robots": lactate.file.bind(null, "public/robots.txt"),

    "favicon": lactate.file.bind(null, "public/images/favicon.ico"),

    "about": lactate.file.bind(null, "public/pages/about.html"),

    "staticFile": lactate.file,

    "serve": function(req, res, data) {
        var s = oppressor(req);
        s.end(data);
        s.pipe(res);
    }
};

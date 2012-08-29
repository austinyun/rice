var http = require("http"),
    router = require("./route")();

module.exports = function () {
    return http.createServer(router);
};

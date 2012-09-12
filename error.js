function Error501(message) {
    this.name = "Error 501";
    this.code = 501;
    this.message = message || "Feature unimplemented";
}
Error501.prototype = new Error();
Error501.prototype.constructor = Error501;

module.exports = {
    "dispatch": function(req, res, err) {
        function notFound(req, res, err) {
            var errString = [
                "Error 404:\n", "You requested: ",
                req.url, "\n", err.path, " not found"].join("");

            res.writeHead(404, { "Content-Type": "text/plain"});
            res.end(errString);
        }
        function serverError(req, res, err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end(err.name + ": " + err.message);
        }
        function notImplemented(req, res, err) {
            res.writeHead(501, {"Content-Type": "text/plain"});
            res.end(err.name + ": " + err.message);
        }

        if (err.code === 501) { return notImplemented(req, res, err); }
        if (err.errno === 34) { return notFound(req, res, err); }
        return serverError(req, res, err);
    },

    "Error501": Error501
};

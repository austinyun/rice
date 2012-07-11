var rice = require('./rice'),
    port = process.env.PORT || 8080;

rice().listen(port, function() {
  console.log("Listening on port " + port);
});

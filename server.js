var rice = require('./rice'),
    port = process.env.PORT || 3000;

rice().listen(port, function() {
  console.log("Listening on port: " + port);
});

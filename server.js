var rice = require('./rice'),
    port = process.env.PORT || 3000,
    home = process.env.HOME;

rice( (home === "/app") ? home + "/" : process.cwd()
).listen(port, function() {
  console.log("Listening on port: " + port);
});

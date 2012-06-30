var Git = require('git-fs'),
    http = require('http');

Git(process.cwd());

// Git.safe(function (version) {
//   if (err) { throw err; } 
//   Git.readFile(version, "rice.js", function(err, data) {
//     if (err) {throw err;}
//     util.p(data);
//   })
// });

Git.readFile("fs", "rice.js", function(err, data) {
  if (err) { throw err; }
  console.log(data.toString());
});

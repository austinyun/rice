var Git = require('git-fs'),
    http = require('http');

Git(process.cwd());

Git.readDir("fs", "entries", function(err, data) {
  if (err) { throw err; }
  console.log(data.files.toString());
});

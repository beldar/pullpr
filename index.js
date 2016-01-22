#! /usr/bin/env node

var program = require('commander'),
    exec    = require('child_process').exec;

program
  .version('0.0.1')
  .usage('[options] <PR id>')
  .arguments('<PR id>')
  .option('-b, --branch <branch name>', 'The branch name the PR is going to be copied to (defaults to PR id)')
  .action(function(id) {
    var branch = program.branch || 'PR'+id;
    console.log('Pulling PR with id '+id+' into branch '+branch);
    var child = exec('git fetch origin pull/'+id+'/head:'+branch+' && git checkout '+branch, function(err, stdout, stderr) {
      console.log(stdout);
      if (err) {
        console.error(err);
      }
      console.error(stderr);
    });
  })
  .parse(process.argv);

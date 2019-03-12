/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var gitHubProfile = require('./promisification.js');
var db = Promise.promisifyAll(require('./callbackReview.js'));
var writeFile = Promise.promisify(fs.writeFile);



var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  return db.pluckFirstLineFromFileAsync(readFilePath)
    .then((firstLine) => { //send request to github
      return gitHubProfile.getGitHubProfileAsync(firstLine);
    })
    .then((profile) => { // write json response to write path
      writeFile(writeFilePath, JSON.stringify(profile));
    });
  // .catch((err) => { //catch errors
  //   console.error(err);
  // })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

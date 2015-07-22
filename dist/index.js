"use strict";

var sloc = require("sloc");
var PROCESS_KEY = "SLOC";

var defaultOptions = {};

module.exports = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  Object.assign(options, defaultOptions);

  return {
    key: PROCESS_KEY,
    run: (function (_run) {
      function run(_x) {
        return _run.apply(this, arguments);
      }

      run.toString = function () {
        return _run.toString();
      };

      return run;
    })(function (data) {
      return run(data, options);
    })
  };
};

function run(files, options) {

  var processedFiles = [];

  try {
    processedFiles = files.map(function (file) {
      return {
        name: file.name,
        data: sloc(file.data, "js", options)
      };
    });
  } catch (e) {
    console.error(e, file);
  }

  var out = {
    files: processedFiles,
    total: processedFiles.reduce(function (total, file) {

      Object.keys(file.data).forEach(function (key) {
        if (!total[key]) {
          total[key] = 0;
        }
        total[key] += file.data[key];
      });
      return total;
    }, {})
  };

  return out;
}
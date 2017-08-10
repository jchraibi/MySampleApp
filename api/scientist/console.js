// A console implementation of scientist that works out of the box. This should
// mostly serve as an example or jump-start point.

var Scientist = require('scientist');

var scientist = new Scientist();

scientist.on('skip', function (experiment) {
  console.log("Scientist experiment skipped", {
    experiment: experiment.name,
    context: experiment.context(),
  });
});

scientist.on('result', function (result) {
  var experiment = result.experiment;
  var control = result.control;

  var each = function (set, iterator) {
    for (var i = 0; i < result[set].length; i++) {
      iterator(result[set][i]);
    }
  };

  // Log success statuses
  each('matched', function (candidate) {
    var duration = result.control.duration - candidate.duration;
    console.log("Scientist candidate matched the control", {
      context: result.context,
      result: candidate.inspect(),
    }, duration > 0 ? " - Experiment is " + Math.abs(duration) + "ms faster" : "Experiment is " + Math.abs(duration) + "ms slower");
  });

  // Log failures with observations
  each('mismatched', function (candidate) {
    console.error("Scientist candidate did not match the control", {
      context: result.context,
      expected: control.inspect(),
      received: candidate.inspect(),
    });
  });

  // Log ignored observations
  each('ignored', function (candidate) {
    console.log("Scientist experiment ignored candidate", {
      context: result.context,
      experiment: experiment,
    });
  });
});

scientist.on('error', function (err) {
  console.error("Error during the Scientis experiment:", err.stack);
});

module.exports = Scientist.prototype.science.bind(scientist);

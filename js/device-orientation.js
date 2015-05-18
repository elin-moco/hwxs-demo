(function() {
  'use strict';

  var movAvgA = MovingAverage();
  var movAvgB = MovingAverage();
  var movAvgG = MovingAverage();

  var DeviceOrientation;
  DeviceOrientation = {
    orientHandler: function(e) {
      document.getElementById('orientation').textContent =
        e.alpha + '\n' + e.beta + '\n' + e.gamma + '\n';
      var smoothA = movAvgA.move(e.alpha);
      var smoothB = movAvgB.move(e.beta);
      var smoothG = movAvgG.move(e.gamma);
      document.getElementById('moving-avg').textContent =
        smoothA + '\n' + smoothB + '\n' + smoothG + '\n';
    },
    motionHandler: function(e) {
      document.getElementById('motion').textContent =
        e.accelerationIncludingGravity.x + '\n' +
        e.accelerationIncludingGravity.y + '\n' +
        e.accelerationIncludingGravity.z + '\n\n' +
        e.interval + '\n';
    },
    init: function() {
      window.addEventListener('deviceorientation',
        DeviceOrientation.orientHandler, true);
      window.addEventListener('devicemotion',
        DeviceOrientation.motionHandler, true);
      Cube3D.load('device-orientation', 'canvas');
    },
    destroy: function() {
      window.removeEventListener('deviceorientation',
        DeviceOrientation.orientHandler, true);
      window.removeEventListener('devicemotion',
        DeviceOrientation.motionHandler, true);
      Cube3D.unload();
    }
  };

  window.demoRoutes['device-orientation'] = DeviceOrientation;
})();

(function() {
  'use strict';

  var DeviceOrientation;
  DeviceOrientation = {
    orientHandler: function(e) {
      document.getElementById('orientation').textContent =
        e.alpha + '\n' + e.beta + '\n' + e.gamma + '\n';
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
    },
    destroy: function() {
      window.removeEventListener('deviceorientation',
        DeviceOrientation.orientHandler, true);
      window.removeEventListener('devicemotion',
        DeviceOrientation.motionHandler, true);
    }
  };

  window.demoRoutes['device-orientation'] = DeviceOrientation;
})();

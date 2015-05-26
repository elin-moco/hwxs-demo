(function() {
  'use strict';

  var movAvgA = MovingAverage();
  var movAvgB = MovingAverage();
  var movAvgG = MovingAverage();
  var O_SKIP_COUNT = 2;
  var oEventCount = 0;
  var M_SKIP_COUNT = 2;
  var mEventCount = 0;

  var DeviceOrientation;
  DeviceOrientation = {
    active: false,
    alpha: 0,
    beta: 0,
    gamma: 0,
    accX: 0,
    accY: 0,
    accZ: 0,
    orientHandler: function(e) {
      if (oEventCount > O_SKIP_COUNT) {
        DeviceOrientation.alpha = movAvgA.move(e.alpha);
        DeviceOrientation.beta = movAvgB.move(e.beta);
        DeviceOrientation.gamma = movAvgG.move(e.gamma);
        oEventCount = 0;
      }
      else {
        oEventCount++;
      }
    },
    motionHandler: function(e) {
      if (mEventCount > M_SKIP_COUNT) {
        DeviceOrientation.accX = e.accelerationIncludingGravity.x;
        DeviceOrientation.accY = e.accelerationIncludingGravity.y;
        DeviceOrientation.accZ = e.accelerationIncludingGravity.z;
        mEventCount = 0;
      }
      else {
        mEventCount++;
      }
    },
    init: function() {
      DeviceOrientation.active = true;
      window.addEventListener('deviceorientation',
        DeviceOrientation.orientHandler, true);
      window.addEventListener('devicemotion',
        DeviceOrientation.motionHandler, true);
      Cube3D.load('device-orientation', 'canvas');

      function render() {
        if (DeviceOrientation.active) {
          var x = DeviceOrientation.gamma;
          var y = DeviceOrientation.beta;
          x = (x > 45) ? 45 : x;
          x = (x < -45) ? -45 : x;
          y = (y > 90) ? 90 : y;
          y = (y < 0) ? 0 : y;
          y -= 45;
          y = -y;
          Cube3D.moveTo(x * 4, y * 4);
          document.getElementById('orientation').textContent =
            Math.round(DeviceOrientation.alpha) + ', ' +
            Math.round(DeviceOrientation.beta) + ', ' +
            Math.round(DeviceOrientation.gamma);
          document.getElementById('motion').textContent =
            Math.round(DeviceOrientation.accX) + ', ' +
            Math.round(DeviceOrientation.accY) + ', ' +
            Math.round(DeviceOrientation.accZ) ;
          requestAnimationFrame(render);
        }
      }

      requestAnimationFrame(render);
    },
    destroy: function() {
      DeviceOrientation.active = false;
      window.removeEventListener('deviceorientation',
        DeviceOrientation.orientHandler, true);
      window.removeEventListener('devicemotion',
        DeviceOrientation.motionHandler, true);
      Cube3D.unload();
    }
  };

  window.demoRoutes['device-orientation'] = DeviceOrientation;
})();

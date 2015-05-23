(function() {
  'use strict';

  var Proximity;
  Proximity = {
    userHandler: function(event) {
      document.getElementById('near').textContent =
        event.near ? 'Near' : 'Far';
    },
    deviceHandler: function(event) {
      var proximity = event.value;
      document.getElementById('distance').textContent =
        proximity + '(' + event.min + '~' + event.max + ')';
      if (proximity > event.max) {
        proximity = event.max;
      }
      else if (proximity < event.min) {
        proximity = event.min;
      }
      var degree = (proximity - event.max) / (event.min - event.max);
      var sun = document.getElementById('sun');
      sun.style.boxShadow = '0 0 ' + (degree + 1) + 'em ' + (degree + 1) + 'em '
        + 'rgba(255, ' + (1 - degree) * 255 + ', 0, 0.75)';
      var moon = document.getElementById('moon');
      moon.style.marginLeft = -1.5 * degree + 'em';
      moon.style.marginTop = -1.85 * degree + 'em';
    },
    init: function() {
      window.addEventListener('userproximity', Proximity.userHandler);
      window.addEventListener('deviceproximity', Proximity.deviceHandler);
    },
    destroy: function() {
      window.removeEventListener('userproximity', Proximity.userHandler);
      window.removeEventListener('deviceproximity', Proximity.deviceHandler);
    }
  };

  window.demoRoutes.proximity = Proximity;
})();

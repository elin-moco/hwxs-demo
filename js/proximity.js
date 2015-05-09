(function() {
  'use strict';

  var Proximity;
  Proximity = {
    userHandler: function(event) {
      document.getElementById('near').textContent =
        event.near ? 'Near' : 'Far';
    },
    deviceHandler: function(event) {
      document.getElementById('distance').textContent =
        event.value + '(' + event.min + '~' + event.max + ')';
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

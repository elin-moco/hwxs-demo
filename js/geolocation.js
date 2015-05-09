(function() {
  'use strict';

  var Geolocation;
  Geolocation = {
    init: function() {
      Geolocation.watchId = navigator.geolocation.watchPosition(
        function(position) {
          document.getElementById('latitude').textContent =
            position.coords.latitude;
          document.getElementById('longitude').textContent =
            position.coords.longitude;
          document.getElementById('altitude').textContent =
            position.coords.altitude;
          document.getElementById('accuracy').textContent =
            position.coords.accuracy;
        });
    },
    destroy: function() {
      navigator.geolocation.clearWatch(Geolocation.watchId);
    }
  };

  window.demoRoutes.geolocation = Geolocation;
})();

(function() {
  'use strict';

  var AmbientLightSensor;

  AmbientLightSensor = {
    handler: function(event) {
      document.getElementById('lightness').textContent = event.value;
    },
    init: function() {
      window.addEventListener('devicelight', AmbientLightSensor.handler);
    },
    destroy: function() {
      window.removeEventListener('devicelight', AmbientLightSensor.handler);
    }
  };

  window.demoRoutes['ambient-light-sensor'] = AmbientLightSensor;

})();

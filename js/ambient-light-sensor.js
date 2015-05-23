(function() {
  'use strict';

  var AmbientLightSensor;

  AmbientLightSensor = {
    handler: function(event) {
      document.getElementById('lightness').textContent = event.value;
      document.getElementById('bulb').style.boxShadow =
        '0 0 ' + (event.value / 100) + 'em ' + (event.value / 100) + 'em ' +
        'rgba(255, 255, 0, 0.75)';
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

(function() {
  'use strict';

  var Vibration;
  Vibration = {
    handler: function() {
      window.navigator.vibrate([200, 100, 200]);
    },
    init: function() {
      document.getElementById('vibrate').addEventListener('click',
        Vibration.handler);
    },
    destroy: function() {
      document.getElementById('vibrate').removeEventListener('click',
        Vibration.handler);
    }
  };

  window.demoRoutes.vibration = Vibration;
})();

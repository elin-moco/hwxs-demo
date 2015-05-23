(function() {
  'use strict';

  var Vibration;
  Vibration = {
    gear: null,
    intervalId: null,
    vibrate: false,
    startHandler: function() {
      Vibration.vibrate = true;
      if (!Vibration.gear.classList.contains('spinning')) {
        Vibration.gear.classList.add('spinning');
      }
    },
    endHandler: function() {
      Vibration.vibrate = false;
      Vibration.gear.classList.remove('spinning');
    },
    init: function() {
      Vibration.gear = document.getElementById('gear');
      Vibration.intervalId = setInterval(function() {
        if (Vibration.vibrate) {
          window.navigator.vibrate(500);
        }
      }, 500);

      Vibration.gear.addEventListener('touchstart',
        Vibration.startHandler);
      Vibration.gear.addEventListener('touchend',
        Vibration.endHandler);
    },
    destroy: function() {
      Vibration.gear.removeEventListener('touchstart',
        Vibration.startHandler);
      Vibration.gear.removeEventListener('touchend',
        Vibration.endHandler);
      clearInterval(Vibration.intervalId);
    }
  };

  window.demoRoutes.vibration = Vibration;
})();

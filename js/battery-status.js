(function() {
  'use strict';

  var battery = navigator.battery || navigator.mozBattery ||
    navigator.webkitBattery;
  var BatteryStatus;
  BatteryStatus = {
    handler: function() {
      document.getElementById('battery-remain').textContent =
        battery.level * 100 + '%';

      document.getElementById('battery-charging').textContent =
        battery.charging ? 'Charging' : 'Not Charging';
    },
    init: function() {
      BatteryStatus.handler();
      battery.addEventListener('chargingchange', BatteryStatus.handler);
      battery.addEventListener('levelchange', BatteryStatus.handler);
    },
    destroy: function() {
      battery.removeEventListener('chargingchange', BatteryStatus.handler);
      battery.removeEventListener('levelchange', BatteryStatus.handler);
    }
  };
  window.demoRoutes['battery-status'] = BatteryStatus;
})();

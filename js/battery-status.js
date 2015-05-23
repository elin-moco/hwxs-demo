(function() {
  'use strict';

  var battery = navigator.battery || navigator.mozBattery ||
    navigator.webkitBattery;
  var BatteryStatus;
  BatteryStatus = {
    charge: 0,
    update: function() {
      var col;
      if (BatteryStatus.charge < 20) {
        // Red - Danger!
        col = ["#750900", "#c6462b", "#b74424", "#df0a00", "#590700"];
      } else if (BatteryStatus.charge < 40) {
        // Yellow - Might wanna charge soon...
        col = ["#754f00", "#f2bb00", "#dbb300", "#df8f00", "#593c00"];
      } else {
        // Green - All good!
        col = ["#316d08", "#60b939", "#51aa31", "#64ce11", "#255405"];
      }
      document.getElementById('battery').style.backgroundImage =
        "linear-gradient(to right, transparent 5%, " + col[0] + " 5%, " + col[0] + " 7%, " + col[1] + " 8%, " + col[1] + " 10%, " + col[2] + " 11%, " + col[2] + " " + (BatteryStatus.charge - 3) + "%, " + col[3] + " " + (BatteryStatus.charge - 2) + "%, " + col[3] + " " + BatteryStatus.charge + "%, " + col[4] + " " + BatteryStatus.charge + "%, black " + (BatteryStatus.charge + 5) + "%, black 95%, transparent 95%), linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 4%, rgba(255,255,255,0.2) 7%, rgba(255,255,255,0.2) 14%, rgba(255,255,255,0.8) 14%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 41%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.4) 86%, rgba(255,255,255,0.6) 90%, rgba(255,255,255,0.1) 92%, rgba(255,255,255,0.1) 95%, rgba(255,255,255,0.5) 98%)";
    },

    handler: function() {
      BatteryStatus.charge = battery.level * 100;
      BatteryStatus.update();
      document.getElementById('bolt').style.display = battery.charging ? 'block' : 'none';
      document.getElementById('battery-remain').textContent =
        BatteryStatus.charge + '% (' + (battery.charging ? 'Charging' : 'Not Charging') + ')';
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

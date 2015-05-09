(function() {
  'use strict';

  var backButton = document.getElementById('back');

  var Index = {
    hash: 'index',

    init: function() {
    },
    destroy: function() {
    }
  };

  var AmbientLightSensor = {
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

  var battery = navigator.battery || navigator.mozBattery ||
    navigator.webkitBattery;
  var BatteryStatus = {
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

  var Geolocation = {
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

  var Touch = {
    elem: document.getElementById('touch'),
    startHandler: function(e) {

    },
    moveHandler: function(e) {
      var touches = e.changedTouches;

      document.getElementById('touch-coords').textContent = touches[0].pageX + ", " + touches[0].pageY + '\n';
    },
    endHandler: function(e) {

    },
    init: function() {
      Touch.elem.addEventListener('touchstart', Touch.startHandler);
      Touch.elem.addEventListener('touchmove', Touch.moveHandler);
      Touch.elem.addEventListener('touchend', Touch.endHandler);
    },
    destroy: function() {
      Touch.elem.removeEventListener('touchstart', Touch.startHandler);
      Touch.elem.removeEventListener('touchmove', Touch.moveHandler);
      Touch.elem.removeEventListener('touchend', Touch.endHandler);
    }
  };

  var PointerLock = {
    elem: document.getElementById('pointer-lock'),
    mouseHandler: function(e) {
      var movementX = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;

      var movementY = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;
      document.getElementById('mouse-delta').textContent =
        movementX + ', ' + movementY;
    },
    handler: function() {
      PointerLock.elem.requestPointerLock();
      document.addEventListener('mousemove', PointerLock.mouseHandler);
    },
    init: function() {
      PointerLock.elem.requestPointerLock =
        PointerLock.elem.requestPointerLock ||
        PointerLock.elem.mozRequestPointerLock ||
        PointerLock.elem.webkitRequestPointerLock;
      document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;
      PointerLock.elem.addEventListener('click', PointerLock.handler);
    },
    destroy: function() {
      PointerLock.elem.removeEventListener('click', PointerLock.handler);
    }
  };

  var Proximity = {
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

  var DeviceOrientation = {
    orientHandler: function(e) {
      document.getElementById('orientation').textContent =
        e.alpha + '\n' + e.beta + '\n' + e.gamma + '\n';
    },
    motionHandler: function(e) {
      document.getElementById('motion').textContent =
        e.accelerationIncludingGravity.x + '\n' +
        e.accelerationIncludingGravity.y + '\n' +
        e.accelerationIncludingGravity.z + '\n\n' +
        e.interval + '\n';
    },
    init: function() {
      window.addEventListener('deviceorientation',
        DeviceOrientation.orientHandler, true);
      window.addEventListener('devicemotion',
        DeviceOrientation.motionHandler, true);
    },
    destroy: function() {
      window.removeEventListener('deviceorientation',
        DeviceOrientation.orientHandler, true);
      window.removeEventListener('devicemotion',
        DeviceOrientation.motionHandler, true);
    }
  };

  var ScreenOrientation = {
    handler: function() {
      document.getElementById('screen').textContent = screen.mozOrientation;
    },
    init: function() {
      ScreenOrientation.handler();
      screen.addEventListener('mozorientationchange',
        ScreenOrientation.handler);
    },
    destroy: function() {
      screen.removeEventListener('mozorientationchange',
        ScreenOrientation.handler);
    }
  };

  var Vibration = {
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

  var MediaDevices = {
    video: document.getElementById('video'),
    stream: null,
    init: function() {
      var p = navigator.mediaDevices.getUserMedia({audio: true, video: true});

      p.then(function(mediaStream) {
        MediaDevices.stream = mediaStream;
        MediaDevices.video.src =
          window.URL.createObjectURL(MediaDevices.stream);
        console.info(MediaDevices.video.src);
        MediaDevices.video.onloadedmetadata = function(e) {
          console.info(e);
        };
        MediaDevices.video.onerror = function(e) {
          console.info(e);
        };
      });

      p.catch(function(e) {
        console.log(e.name);
      });

    },
    destroy: function() {
      MediaDevices.video.pause();
      MediaDevices.stream.stop();
      MediaDevices.video.src = null;
      MediaDevices.stream = null;
    }
  };

  var prevDemoHash = Index.hash;

  var demoRoutes = {
    'index': Index,
    'ambient-light-sensor': AmbientLightSensor,
    'battery-status': BatteryStatus,
    'geolocation': Geolocation,
    'touch': Touch,
    'pointer-lock': PointerLock,
    'proximity': Proximity,
    'device-orientation': DeviceOrientation,
    'screen-orientation': ScreenOrientation,
    'vibration': Vibration,
    'media-devices': MediaDevices
  };

  //Route demos with hash tag
  var route = function() {
    if (prevDemoHash) {
      document.getElementById(prevDemoHash).style.display = 'none';
      demoRoutes[prevDemoHash].destroy();
    }
    var demoHash = location.hash ? location.hash.substr(1) : Index.hash;
    if (demoHash == Index.hash) {
      backButton.style.display = 'none';
    }
    else {
      backButton.style.display = 'block';
    }
    prevDemoHash = demoHash;
    var demoElem = document.getElementById(demoHash);
    demoElem.style.display = 'block';
    document.getElementById('title-bar').textContent = demoElem.title;
    var demo = demoRoutes[demoHash];
    demo.init();
  };
  route();
  window.addEventListener('hashchange', route);

})();

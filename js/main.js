/* global Modernizr */
(function() {
  'use strict';

  Modernizr.addTest('pointerlock2',
      undefined !== Modernizr.prefixed('pointerLockElement', document));

  window.compatibility = {
    'ambient-light-sensor': undefined !== window.ondevicelight,
    'battery-status': Modernizr.battery,
    'geolocation': Modernizr.geolocation,
    'touch': Modernizr.touch,
    'pointer-lock': Modernizr.pointerlock2,
    'proximity': undefined !== window.onuserproximity,
    'device-orientation': Modernizr.deviceorientation,
    'screen-orientation': undefined !== screen.onmozorientationchange,
    'vibration': Modernizr.vibrate,
    'media-devices': Modernizr.getusermedia
  };

  window.demoRoutes = {};

  for (var api in window.compatibility) {
    document.getElementById('index').querySelector('.' + api).classList.add(
      window.compatibility[api] ? 'supported' : 'unsupported');
    Modernizr.load({
      test: window.compatibility[api],
      yep: 'js/' + api + '.js'
    });
  }
  Modernizr.load('js/route.js');

})();

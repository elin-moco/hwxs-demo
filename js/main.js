/* global Modernizr */
(function() {
  'use strict';
  window.requestAnimationFrame =
    window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  window.MovingAverage = (function(len) {
    var length = 10;
    if (len) {
      length = len;
    }
    var history = [];
    var move = function(value) {
      history.push(value);
      if (history.length < length) {
        return null;
      }
      else {
        history.shift();
        return history.reduce(function(sum, current) { return sum + current; }) / length;
      }
    };
    return {
      move: move
    }
  });

  Modernizr.addTest('pointerlock2',
      undefined !== Modernizr.prefixed('pointerLockElement', document));

  window.compatibility = {
    'ambient-light-sensor': undefined !== window.ondevicelight,
    'battery-status': Modernizr.battery,
    'geolocation': Modernizr.geolocation,
    'touch': Modernizr.touch,
    'pointer-lock': Modernizr.pointerlock2 && !Modernizr.touch,
    'proximity': undefined !== window.onuserproximity && Modernizr.touch,
    'device-orientation': Modernizr.deviceorientation && Modernizr.touch,
    'screen-orientation': undefined !== screen.onmozorientationchange && Modernizr.touch,
    'vibration': Modernizr.vibrate && Modernizr.touch,
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

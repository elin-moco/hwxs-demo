(function() {
  'use strict';

  var ScreenOrientation;
  ScreenOrientation = {
    angles: {
      'portrait-primary': '0deg',
      'landscape-primary': '-90deg',
      'portrait-secondary': '180deg',
      'landscape-secondary': '90deg'
    },
    handler: function() {
      document.getElementById('screen').textContent = screen.mozOrientation;
      document.getElementById('smartphone').style.transform =
        'rotate('+ScreenOrientation.angles[screen.mozOrientation]+')';
    },
    init: function() {
      //FIXME: this is to enable screen orientation in packaged app.
      window.addEventListener('deviceorientation',
        function() {}, true);
      ScreenOrientation.handler();
      screen.addEventListener('mozorientationchange',
        ScreenOrientation.handler);
    },
    destroy: function() {
      screen.removeEventListener('mozorientationchange',
        ScreenOrientation.handler);
    }
  };

  window.demoRoutes['screen-orientation'] = ScreenOrientation;
})();

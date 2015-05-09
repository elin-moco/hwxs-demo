(function() {
  'use strict';

  var ScreenOrientation;
  ScreenOrientation = {
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

  window.demoRoutes['screen-orientation'] = ScreenOrientation;
})();

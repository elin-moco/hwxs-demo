(function() {
  'use strict';

  var Touch;
  Touch = {
    elem: document.getElementById('touch'),
    startHandler: function(e) {

    },
    moveHandler: function(e) {
      var touches = e.changedTouches;

      document.getElementById('touch-coords').textContent =
        touches[0].pageX + ', ' + touches[0].pageY + '\n';
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

  window.demoRoutes.touch = Touch;
})();

(function() {
  'use strict';

  var Touch;
  Touch = {
    active: false,
    prevX: 0,
    prevY: 0,
    currX: 0,
    currY: 0,
    deltaX: 0,
    deltaY: 0,
    elem: document.getElementById('touch'),
    startHandler: function(e) {
      var touches = e.changedTouches;
      Touch.prevX = touches[0].pageX;
      Touch.prevY = touches[0].pageY;
    },
    moveHandler: function(e) {
      var touches = e.changedTouches;
      Touch.currX = touches[0].pageX;
      Touch.currY = touches[0].pageY;
      Touch.deltaX = Touch.currX - Touch.prevX;
      Touch.deltaY = Touch.currY - Touch.prevY;
      Touch.prevX = Touch.currX;
      Touch.prevY = Touch.currY;
    },
    endHandler: function(e) {
      Touch.deltaX = 0;
      Touch.deltaY = 0;
    },
    init: function() {
      Touch.active = true;
      Touch.elem.addEventListener('touchstart', Touch.startHandler);
      Touch.elem.addEventListener('touchmove', Touch.moveHandler);
      Touch.elem.addEventListener('touchend', Touch.endHandler);
      Cube3D.load('touch', 'canvas');
      function render() {
        if (Touch.active) {
          Cube3D.move(Touch.deltaX, -Touch.deltaY);
          document.getElementById('touch-coords').textContent =
            Touch.currX + ', ' + Touch.currY ;
          document.getElementById('touch-delta').textContent =
            Touch.deltaX + ', ' + Touch.deltaY;
          requestAnimationFrame(render);
        }
      }

      requestAnimationFrame(render);
    },
    destroy: function() {
      Touch.active = false;
      Touch.elem.removeEventListener('touchstart', Touch.startHandler);
      Touch.elem.removeEventListener('touchmove', Touch.moveHandler);
      Touch.elem.removeEventListener('touchend', Touch.endHandler);
      Cube3D.unload();
    }
  };

  window.demoRoutes.touch = Touch;
})();

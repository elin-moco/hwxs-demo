(function() {
  'use strict';

  var PointerLock;
  PointerLock = {
    active: false,
    deltaX: 0,
    deltaY: 0,
    elem: document.getElementById('pointer-lock'),
    mouseHandler: function(e) {
      PointerLock.deltaX = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;

      PointerLock.deltaY = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;
    },
    handler: function() {
      PointerLock.elem.requestPointerLock();
      document.addEventListener('mousemove', PointerLock.mouseHandler);
    },
    init: function() {
      PointerLock.active = true;
      PointerLock.elem.requestPointerLock =
        PointerLock.elem.requestPointerLock ||
        PointerLock.elem.mozRequestPointerLock ||
        PointerLock.elem.webkitRequestPointerLock;
      document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;
      PointerLock.elem.addEventListener('click', PointerLock.handler);
      Cube3D.load('pointer-lock', 'canvas');
      function render() {
        if (PointerLock.active) {
          Cube3D.move(PointerLock.deltaX, -PointerLock.deltaY);
          document.getElementById('mouse-delta').textContent =
            PointerLock.deltaX + ', ' + PointerLock.deltaY;
          requestAnimationFrame(render);
        }
      }

      requestAnimationFrame(render);
    },
    destroy: function() {
      PointerLock.active = false;
      PointerLock.elem.removeEventListener('click', PointerLock.handler);
      Cube3D.unload();
    }
  };

  window.demoRoutes['pointer-lock'] = PointerLock;
})();

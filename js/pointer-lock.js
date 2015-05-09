(function() {
  'use strict';

  var PointerLock;
  PointerLock = {
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

  window.demoRoutes['pointer-lock'] = PointerLock;
})();

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

  window.demoRoutes.index = Index;

  document.getElementById('index').querySelector('.unsupported').onclick =
    function(e) {
      e.preventDefault();
      alert('API not supported on your device!');
    };

  var prevDemoHash = Index.hash;

  //Route demos with hash tag
  var route = function() {
    if (prevDemoHash) {
      document.getElementById(prevDemoHash).style.display = 'none';
      window.demoRoutes[prevDemoHash].destroy();
    }
    var demoHash = location.hash ? location.hash.substr(1) : Index.hash;
    if (demoHash == Index.hash) {
      backButton.style.display = 'none';
    } else {
      backButton.style.display = 'block';
    }
    prevDemoHash = demoHash;
    var demoElem = document.getElementById(demoHash);
    if (demoElem) {
      demoElem.style.display = 'block';
      document.getElementById('title-bar').textContent = demoElem.title;
      var demo = window.demoRoutes[demoHash];
      if (demo) {
        demo.init();
      } else {
        alert('Demo code not found!');
      }
    } else {
      alert('Demo element not found!');
    }
  };
  route();
  window.addEventListener('hashchange', route);

})();

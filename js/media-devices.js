(function() {
  'use strict';

  var MediaDevices;
  MediaDevices = {
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

  window.demoRoutes['media-devices'] = MediaDevices;
})();

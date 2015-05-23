(function() {
  'use strict';

  function loadScript(filename, filetype, callback) {
    var fileref = null;
    if (filetype == "js") { //if filename is a external JavaScript file
      fileref = document.createElement('script');
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
      fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined") {
      fileref.onload = callback;
      document.getElementsByTagName("head")[0].appendChild(fileref)
    }
  }

  var Geolocation;
  Geolocation = {
    marker: null,
    options: null,
    map: null,
    geoHandler: function() {
      Geolocation.watchId = navigator.geolocation.watchPosition(
        function(position) {
          document.getElementById('latitude').textContent =
            position.coords.latitude;
          document.getElementById('longitude').textContent =
            position.coords.longitude;
          var latLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          Geolocation.options = {
            zoom: 15,
            center: latLong
          };

          if (Geolocation.map) {
            Geolocation.map.set(Geolocation.options);
          }
          else {
            Geolocation.map = new google.maps.Map(document.getElementById('map'),
              Geolocation.options);
          }

          if (Geolocation.marker) {
            Geolocation.marker.setMap(null);
          }
          Geolocation.marker = new google.maps.Marker({
            position: latLong,
            map: Geolocation.map,
            title: 'Hello World!'
          });
        });
    },
    init: function() {
      window.initMap = Geolocation.geoHandler;
      if (Geolocation.map == null) {
        loadScript('https://maps.googleapis.com/maps/api/js?v=3.exp' +
          '&signed_in=true&callback=initMap', 'js');
      }
      else {
        Geolocation.geoHandler();
      }
    },
    destroy: function() {
      navigator.geolocation.clearWatch(Geolocation.watchId);
    }
  };

  window.demoRoutes.geolocation = Geolocation;
})();

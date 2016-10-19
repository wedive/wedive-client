/**
 * Created by visa on 02/12/15.
 */
(function(document) {
  'use strict';

  // TODO move into another file
  app.config = {
    "client_id": "strapieno-admin",
    "base-url-rest" : "http://127.0.0.72/rest",
    "base-url" : "http://127.0.0.72",
    "google-map-api-key": "AIzaSyAqDcu1vu9rj_Fj-3qCxFKbwdozZFGZOOE"
  };

  /**
   * Notification handler to paper toast element
   */
  app.notificationHandler = function (e) {
    this.$.notification.text = e.detail.text;
    this.$.notification.show();
    this.$.preregistration.toggle();
  };

  /**
   * Load geolocation user information
   */
  app.requestCurrentPosition = function () {
    this.currentPosition = null;

    if (!navigator) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
        function (pos) {
          this.currentPosition = pos.coords;
          console.groupCollapsed('GEO');
          console.log('LATITUDE : ' + this.currentPosition.latitude);
          console.log('LONGITUDE: ' + this.currentPosition.longitude);
          console.groupEnd();
        }.bind(this),
        function (error) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        },
        []
    );
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    // TODO understand
  };

  /**
   * Set of function for the boot of the application
   */
  app.boot = function () {
    app.requestCurrentPosition();
  };

  /**
   * Boot application
   */
  window.addEventListener(
    'WebComponentsReady',
    function() {
      app.boot();
    }
  );

})(document);

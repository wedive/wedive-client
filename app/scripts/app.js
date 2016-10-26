/**
 * Created by visa on 02/12/15.
 */
(function(document) {
  'use strict';

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
          console.warn('ERROR(' + error.code + '): ' + error.message);
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

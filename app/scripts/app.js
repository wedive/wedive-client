/**
 * Created by visa on 02/12/15.
     */
    (function (document) {
    'use strict';

    /**
     * Notification handler to paper toast element
     */
    app.notificationHandler = function (e) {
        this.$.notification.text = e.detail.text;
        this.$.notification.show();
    };

    app.closeNotififaction = function () {
        var notification = document.getElementById('notification');
        notification.toggle();
    },

    app.openRegistration = function () {
        var dialog = document.querySelector('#registrationDialog');
        dialog.toggle();
    },

    app.openLogin = function () {
        var dialog = document.querySelector('#loginDialog');
        dialog.toggle();
    },

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
                var event = new CustomEvent('load-position', {'detail': pos.coords});
                this.dispatchEvent(event);
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

    app.openDrawer = function () {

        var drawer = document.querySelector('app-drawer');
        if (drawer) {
            drawer.toggle();
        } else {
            console.warn('Drawer not set in the document');
        }
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
        function () {
            app.boot();
        }
    );

})(document);

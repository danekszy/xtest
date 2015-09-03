/* ==========================================================================

    Project: xtest
    Author: Daniel Szymanek
    Last updated: @@timestamp

   ========================================================================== */

(function($) {

  'use strict';

  var App = {

    /**
     * Init Function
     */
    init: function() {
      App.gallerySlideshow.init();
    },

    /**
     * 2 second, primitive gallery slideshow
     */
    gallerySlideshow: {
      photoCount: 0,
      currentPhoto: 1,

      init: function() {
        var photos = $(".gallery-thumb");
        this.photoCount = photos.length;

        //Start colorbox
        photos.colorbox({rel:'gallery-thumb', open: true});

        //Bind to listen for slide changes
        $(document).bind('cbox_complete', this.handleSlideChange);
      },

      handleSlideChange: function () {
        if (App.gallerySlideshow.currentPhoto < App.gallerySlideshow.photoCount)
          App.gallerySlideshow.scheduleNext();
        else
          App.gallerySlideshow.scheduleClose();
      },

      scheduleNext: function () {
        setTimeout(function () {
            App.gallerySlideshow.currentPhoto++;
            $.colorbox.next();
          }, 2000);
      },

      scheduleClose: function () {
        setTimeout($.colorbox.close, 2000);
      }
    }

  };

  $(function() {
    App.init();
  });

})(jQuery);

'use strict';

/** @this */
function $$RAFProvider() { //rAF
  this.$get = ['$window', '$timeout', function($window, $timeout) {
    var windowRequestAnimationFrame = $window.requestAnimationFrame ||
                                $window.webkitRequestAnimationFrame;

    var windowCancelAnimationFrame = $window.cancelAnimationFrame ||
                               $window.webkitCancelAnimationFrame ||
                               $window.webkitCancelRequestAnimationFrame;

    var rafSupported = !!windowRequestAnimationFrame;
    var raf = rafSupported
      ? function(fn) {
          var id = windowRequestAnimationFrame(fn);
          return function() {
            windowCancelAnimationFrame(id);
          };
        }
      : function(fn) {
          var timer = $timeout(fn, 16.66, false); // 1000 / 60 = 16.666
          return function() {
            $timeout.cancel(timer);
          };
        };

    raf.supported = rafSupported;

    return raf;
  }];
}

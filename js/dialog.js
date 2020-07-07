'use strict';

(function () {
  var WINDOW_SIZE_X_LEFT = 0;
  var WINDOW_SIZE_X_RIGHT = 1200;
  var WINDOW_SIZE_Y_TOP = 130;
  var WINDOW_SIZE_Y_BOTTOM = 630;

  var pinPointLimitTop = WINDOW_SIZE_Y_TOP - window.utile.pinSizeY - window.utile.pinPointSizeY;
  var pinPointLimitBottom = WINDOW_SIZE_Y_BOTTOM - window.utile.pinSizeY - window.utile.pinPointSizeY;
  var pinPointLimitLeft = WINDOW_SIZE_X_LEFT - window.utile.pinHalfSize;
  var pinPointLimitRight = WINDOW_SIZE_X_RIGHT - window.utile.pinHalfSize;

  var mapPin = document.querySelector('.map__pin');
  var address = document.querySelector('#address');

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.removeEventListener('mouseup', onMouseUp);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newOffsetX = mapPin.offsetLeft - shift.x;
      var newOffsetY = mapPin.offsetTop - shift.y;

      if (newOffsetY >= pinPointLimitTop && newOffsetY <= pinPointLimitBottom) {
        mapPin.style.top = newOffsetY + 'px';
      }

      if (newOffsetX >= pinPointLimitLeft && newOffsetX <= pinPointLimitRight) {
        mapPin.style.left = newOffsetX + 'px';
      }

      address.value = (newOffsetX + window.utile.pinHalfSize) + ', ' + (newOffsetY + window.utile.pinSizeY + window.utile.pinPointSizeY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
